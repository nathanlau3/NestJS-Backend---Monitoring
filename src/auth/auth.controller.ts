import { Controller, Body, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthEntity } from './auth.dto';
import {Response} from 'express'
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService,
        private jwtService: JwtService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() signInDto: AuthEntity, @Res() res: Response, ) {
        let data = await this.authService.signIn(signInDto)
        if (data) {
            if (data.NIU === signInDto.NIU && data.password === signInDto.password) {
                const payload = {sub: data.id, NIU: data.NIU}
                res.status(200).send({
                    access_token: await this.jwtService.signAsync(payload)
                })
            }
            else {
                res.status(401).send({
                    message: "Not Authorized"
                })
            }
        }
        else {
            res.status(404).send({
                message: "Not found"
            })
        }
    }
    
}
