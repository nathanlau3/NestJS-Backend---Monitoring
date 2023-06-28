import { Injectable } from '@nestjs/common';
import { AccountService } from '../services/Account/account.service';
import { Account, Prisma } from '@prisma/client';
import { AccountRequestEntity } from '../services/Account/account.dto';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
    constructor(private accountService: AccountService) {}

    async signIn(params: AccountRequestEntity): Promise<Account> {
        let where: Prisma.AccountWhereInput = {
            NIU: params.NIU,
            password: params.password
        }
        // Object.keys(payload).forEach((x) => {
        //     if (params[x]) payload[x] = params[x];
        //   });
        let data = await this.accountService.getAccountId({where})
        if (data){
            return data
        }
        else {
            throw new HttpException('not found', HttpStatus.NOT_FOUND)
        }

    }
}
