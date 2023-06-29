import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Account as AccountModel, Prisma } from '@prisma/client';
import { AccountAddEntity, AccountRequestEntity } from './account.dto';
import { AuthGuard } from '../../auth/auth.guard';
import { AuthService } from '../../auth/auth.service';
import {Response} from 'express'

@Controller('/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('/:id')
  async getAccountById(@Param('id') id: string): Promise<AccountModel> {
    let akun: AccountModel;
    akun.id = Number(id);
    return this.accountService.getAccountId({ where: akun });
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async getAccount(    
    @Res() res: Response,
    @Query() accountData: AccountRequestEntity,
  ): Promise<Response> {            
    let where: Prisma.AccountWhereInput = {
      id: null,
      NIU: null,
      email: null
    }
    let orderBy: Prisma.AccountOrderByWithRelationInput = {
      id: null,
      NIU: null,
      email: null,
      createdAt: null,
      updatedAt: null
    }
    Object.keys(where).forEach((x) => {
      if (accountData[x]) where[x] = accountData[x];
      else where[x] = undefined
    });
    if (accountData.order != null && accountData.orderDirection) {
      Object.keys(orderBy).forEach((x) => {
        if (accountData[x]) orderBy[x] = accountData[x];
        else orderBy[x] = undefined
      });
    }
    else {
      orderBy = undefined
    }
    let result = await this.accountService.getAccount({
      where,
      orderBy
    });
    console.log(result)
    if (result.length > 0) {
      return res.status(200).send({
        message: "succed",
        data: result
      });
    }
    else {
      return res.status(404).send({
        message: "Not found"
      })
    }    
  }

  // @Get('filtered-posts/:searchString')
  // async getFilteredPosts(
  //   @Param('searchString') searchString: string,
  // ): Promise<PostModel[]> {
  //   return this.postService.posts({
  //     where: {
  //       OR: [
  //         {
  //           title: { contains: searchString },
  //         },
  //         {
  //           content: { contains: searchString },
  //         },
  //       ],
  //     },
  //   });
  // }

  @Post('add')
  // @ApiBody({ AccountRequestEntity })
  async createDraft(
    @Body() accountData: AccountAddEntity,
  ): Promise<AccountModel> {
    let payload: Prisma.AccountCreateInput = {
      email: null,
      NIU: null,
      password: null,
      createdAt: null,
      updatedAt: null
    };
    Object.keys(payload).forEach((x) => {
      if (accountData[x]) payload[x] = accountData[x];
      else payload[x] = undefined
    });
    return this.accountService.createAccount(payload);
  }

  // @Post('user')
  // async signupUser(
  //   @Body() userData: { name?: string; email: string },
  // ): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  //     @Put('publish/:id')
  //     async publishPost(@Param('id') id: string): Promise<PostModel> {
  //       return this.postService.updatePost({
  //         where: { id: Number(id) },
  //         data: { published: true },
  //       });
  //     }

  //     @Delete('post/:id')
  //     async deletePost(@Param('id') id: string): Promise<PostModel> {
  //       return this.postService.deletePost({ id: Number(id) });
  //     }
}