import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthService } from './auth/auth.service';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Public()
  @Post('auth/login')
  async login(@Request() req, @Res() res: Response) {
    const log = this.authService.login(req);
    res.status(HttpStatus.ACCEPTED).json(log);
  }

  @Get('profile')
  getProfile(@Request() req, @Res() res: Response) {
    res.status(HttpStatus.OK).json(req.user);
  }
}
