import { BadRequestException } from "@nestjs/common";
import { Request } from "express";

export const fileNameHandler = (req: any, file: any,
    callback: (error: any, filename: any) => void) => {

    const newFileName = req.user.username + " " + file.originalname;
    callback(null, newFileName)
}

export const imageFileFilter = (req: Request, file: any,
    callback: (error: any, valid: boolean) => void) => {

    if (!file.originalname || !file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new BadRequestException("File type must be jpg, jpeg, png"), false)
    }
    callback(null, true)
}