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
        console.log(data)
        if (data) {
            res.status(200).send({
                message: "Succed",
                data
            })
        }
        else {
            res.status(401).send({
                message: "Not Authorized"
            })
        }
    }
    
}
