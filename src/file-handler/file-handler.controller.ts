import { Body, Controller, HttpStatus, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNameHandler, imageFileFilter } from './file.handler';
import { Express } from 'express';
import { CreateFileDto } from './dto/create-file.dto';
import { FileHandlerService } from './file-handler.service';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('file-handler')
export class FileHandlerController {

    constructor(private readonly fileHandlerService: FileHandlerService) { }

    @Post('upload')

    //For Swagger File Upload Option
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      description: 'Upload file with description',
      schema: {
        type: 'object',
        properties: {
          file: {
            type: 'string',
            format: 'binary',
          },
          description: {
            type: 'string',
          },
        },
      },
    })

    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                filename: fileNameHandler,
                destination: './uploads'
            }),
            limits: {
                fileSize: 1000 * 1000 * 5 //5mb
            },
            fileFilter: imageFileFilter
        }),
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() fileDesc: CreateFileDto,
        @Req() req: any
    ) {
        const desc = fileDesc.description
        await this.fileHandlerService.saveProfilePicture(req, file, desc)

        return {
            message: "File uploaded successfully",
            success: true,
            statusCode: HttpStatus.ACCEPTED,
            filename: file.filename,
            size: file.size,
            fileDetails: {
                ...file,
                description: fileDesc.description || null
            }
        }
    }
}
