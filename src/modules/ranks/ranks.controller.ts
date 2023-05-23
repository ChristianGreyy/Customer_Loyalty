import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RanksService } from './ranks.service';
import CreateRankDto from './dtos/create-rank.dto';
import UpdateRankDto from './dtos/update-rank.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { HasRoles } from 'src/common/decorators/has-roles.decorator';
import { Role } from 'src/common/enums/role';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Rank')
@Controller('ranks')
export class RanksController {
  constructor(private ranksService: RanksService) {}

  @HasRoles(Role.admin, Role.store, Role.user)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/')
  async getRanks() {
    const ranks = await this.ranksService.getRanks();
    return ranks;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async createRank(@Body() createRankDto: CreateRankDto) {
    const newRank = await this.ranksService.createRank(createRankDto);
    return newRank;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:rankId')
  async getRankById(@Param('rankId', ParseIntPipe) rankId: number) {
    const rank = await this.ranksService.getRankById(rankId);
    if (!rank) {
      throw new NotFoundException('Rank not found');
    }
    return rank;
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('/:rankId')
  async updateRankById(
    @Body() updateRankDto: UpdateRankDto,
    @Param('rankId', ParseIntPipe) rankId: number,
  ) {
    await this.ranksService.updateRankById(updateRankDto, rankId);
    return {
      message: 'Update rank successfully',
    };
  }

  @HasRoles(Role.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete('/:rankId')
  async deleteRankById(@Param('rankId', ParseIntPipe) rankId: number) {
    await this.ranksService.deleteRankById(rankId);
    return { message: 'Delete rank successfully' };
  }
}
