import {Controller, Post, Body, UseInterceptors, UploadedFiles, Get, Query} from '@nestjs/common';
import {UserService} from './user.service';
import {RegisterUserDto} from './dto/register-user.dto';
import {LoginUserDto} from "./dto/login-user.dto";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Express} from "express";
import * as fs from "fs";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('register')
    register(@Body() registerUserDto: RegisterUserDto) {
        console.log(registerUserDto);
        return this.userService.register(registerUserDto);
    }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.userService.login(loginUserDto)
    }

    // 上传接口
    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 20, {
        dest: 'uploads1'
    }))
    uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>, @Body() body: { name: string }) {
        console.log('body', body)
        console.log('files', files)
        const fileName = body.name.match(/(.+)\-\d+$/)[1];
        const chunkDir = 'uploads1/chunks_' + fileName;
        if (!fs.existsSync(chunkDir)) {
            fs.mkdirSync(chunkDir);
        }
        fs.cpSync(files[0].path, chunkDir + '/' + body.name);
        fs.rmSync(files[0].path);
    }

    // 合并
    @Get('merge')
    merage(@Query('name') name: string) {
        const chunkDir = 'uploads1/chunks_' + name;
        const files = fs.readdirSync(chunkDir);
        let startPos = 0;
        let count = 0;
        files.map(file => {
            const filePath = chunkDir + '/' + file;
            const stream = fs.createReadStream(filePath);
            stream.pipe(fs.createWriteStream('uploads1' + name, {
                start: startPos
            })).on('finish', () => {
                count++;
                if (count === files.length) {
                    fs.rm(chunkDir, {
                        recursive: true
                    }, () => {
                    });
                }
            })
            startPos += fs.statSync(filePath).size;
        })
    }
}
