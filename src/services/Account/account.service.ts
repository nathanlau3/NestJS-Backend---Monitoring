import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Account, Prisma } from '@prisma/client';
import moment from 'moment';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async getAccount(params: {
    where?: Prisma.AccountWhereInput,
    // skip?: number,
    // cursor?: Prisma.AccountWhereUniqueInput,
    orderBy?: Prisma.AccountOrderByWithRelationInput
  }    
  ): Promise<Account[] | null> {
    const { where, orderBy } = params;
    return this.prisma.account.findMany({
      where,
      orderBy
    });
  }

  async getAccountId(params: {
    where?: Prisma.AccountWhereInput;   
  }): Promise<Account> {
    const { where } = params;
    return this.prisma.account.findFirst({      
      where
    });
  }

  async createAccount(data: Prisma.AccountCreateInput): Promise<Account> {
    return this.prisma.account.create({
      data,
    });
  }

  async updateaccount(params: {
    where: Prisma.AccountWhereUniqueInput;
    data: Prisma.AccountUpdateInput;
  }): Promise<Account> {
    const { where, data } = params;
    return this.prisma.account.update({
      data,
      where,
    });
  }

  async deleteaccount(where: Prisma.AccountWhereUniqueInput): Promise<Account> {
    return this.prisma.account.delete({
      where,
    });
  }
}