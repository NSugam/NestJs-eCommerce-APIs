import { ConflictException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userEntity: Repository<User>,
    private readonly entityManager: EntityManager,
    private readonly configService: ConfigService
  ) { }

  async createUser(user: CreateUserDto) {
    const existingUser = await this.userEntity.findOne({
      where: [
        { email: user.email },
        { username: user.username },
      ],
    })

    if (existingUser) throw new ConflictException('Username or Email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    const newUser = new User({ ...user, password: hashedPassword })
    await this.entityManager.save(newUser)

    return { message: 'New User Created', statusCode: HttpStatus.CREATED, success: true }
  }

  async login(user: LoginUserDto, res: Response) {
    const JWT_SECRET = this.configService.get('JWT_SECRET')

    const userData = await this.userEntity.findOne({ where: { email: user.email } })
    if (!userData) throw new UnauthorizedException('Invalid credentials')

    const isMatch = await bcrypt.compare(user.password, userData.password)
    if (!isMatch) throw new UnauthorizedException('Invalid credentials')

    const token = jwt.sign({ userId: userData.id }, JWT_SECRET, { expiresIn: '7d' })

    res.cookie('NestJS_test_', token, {
      httpOnly: true,
      secure: true, // true for swagger and production in https
      sameSite: 'none',
      maxAge: 60 * 60 * 1000, // 1 hr
    });

    const { password, ...userWithoutPassword } = userData;
    return res.status(HttpStatus.OK).json({
      message: 'Login successful',
      success: true,
      loggedInUser: userWithoutPassword,
      expiryTime: new Date(Date.now() + 60 * 60 * 1000).toISOString()
    });
  }

  async logout(res: Response) {
    res.cookie('NestJS_test_', '', {
      expires: new Date(0)
    })
    return res.status(HttpStatus.OK).json({ message: 'Account Logged Out', success: true })
  }

  async findAll(role?: 'user' | 'admin') {
    const user = await this.userEntity.find({
      where: { role: role },
      select: ['username', 'email', 'phone', 'role']
    })

    return { message: 'All User Data', statusCode: HttpStatus.OK, success: true, roleFilter: role, user }
  }

  async findByUsername(username: string) {
    const user = await this.userEntity.findOne({
      where: { username: username },
      select: ['username', 'email', 'phone', 'role']
    })

    if (!user) throw new NotFoundException(`User with username ${username} not found`);

    return { message: 'Specific user data', statusCode: HttpStatus.OK, success: true, user }
  }

  async getProfile(req: any) {
    return { message: 'Logged-In User Data', statusCode: HttpStatus.OK, success: true, user: req.user }
  }

  async update(username: string, updateDetails: UpdateUserDto) {

    const userData = await this.userEntity.findOne({ where: { username: username } })
    if (!userData) throw new NotFoundException(`User with username ${username} not found`);

    this.userEntity.merge(userData, updateDetails)
    await this.entityManager.save(userData)

    return {
      message: "User details Updated Successfully",
      statusCode: HttpStatus.CREATED, success: true, updateDetails
    }
  }

  async deleteByUsername(username: string) {
    let user = await this.userEntity.delete({ username: username })
    if (!user) throw new NotFoundException(`User with username ${username} not found`);

    return { message: `User: ${username} Deleted Successfully`, statusCode: HttpStatus.OK, success: true }
  }
}
