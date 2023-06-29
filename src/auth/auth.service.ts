import { Injectable } from '@nestjs/common';
import { AccountService } from '../services/Account/account.service';
import { Account, Prisma } from '@prisma/client';
import { AccountRequestEntity } from '../services/Account/account.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private accountService: AccountService,
        private jwtService: JwtService
    ) {}

    async signIn(params: AccountRequestEntity): Promise<any> {
        let where: Prisma.AccountWhereInput = {
            NIU: params.NIU,
            password: params.password
        }
        // Object.keys(payload).forEach((x) => {
        //     if (params[x]) payload[x] = params[x];
        //   });
        let data = await this.accountService.getAccountId({where})
        if (data.NIU === params.NIU && data.password === params.password) {
                const payload = {sub: data.id, NIU: data.NIU}
                console.log(payload)
                return {
                    access_token : await this.jwtService.signAsync(payload, {secret: "jwtConstants.secret", expiresIn: 3600})                
                    // access_token: this.jwtService.sign(payload)
                }
            }
            else {
                throw new HttpException('not authorized', HttpStatus.NOT_FOUND)
            }

    }
}
