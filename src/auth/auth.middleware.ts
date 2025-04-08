import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(User)
        private readonly userEntity: Repository<User>,
        private readonly configService: ConfigService
    ) { }

    async use(req: any, res: Response, next: NextFunction) {
        const PUBLIC_ROUTES = [
            "user/register",
            "user/login",
            "product/all",
            "permissions"
        ]

        const ADMIN_ROUTES = [
            "user/all",
            "product/add",
            "permissions"
        ]

        const route = req.originalUrl.replace(/^\/api\//, "").split("?")[0];
        if (PUBLIC_ROUTES.includes(route.toString())) return next();

        try {
            const token = req.cookies.NestJS_test_;
            if (!token) return res.status(401).json({
                message: "Please Login to Continue",
                statusCode: HttpStatus.UNAUTHORIZED,
                success: false,
            })

            const JWT_SECRET = this.configService.get('JWT_SECRET');
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

            const user = await this.userEntity.findOne({
                where: { id: decoded.userId },
                select: ["username", "email", "phone", "role"]
            });

            if (!user) return res.status(401).json({
                message: "Invalid User Credentials",
                statusCode: HttpStatus.UNAUTHORIZED,
                success: false
            })

            if (ADMIN_ROUTES.includes(route.toString()) && user.role !== 'admin')
                return res.status(401).json({
                    message: "Unauthorised Route Access",
                    statusCode: HttpStatus.UNAUTHORIZED,
                    success: false,
                    role: user.role
                })

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Invalid Token", success: false });
        }
    }

}
