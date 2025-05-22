import { Controller, Post, Get, Delete, Body, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateStudentLikeDto } from '../../dto/create-student-like.dto';
import { CreateStartupLikeDto } from '../../dto/create-startup-like.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post('student')
  @UsePipes(new ValidationPipe())
  studentLikesOffer(@Body() createStudentLikeDto: CreateStudentLikeDto) {
    return this.likeService.studentLikesOffer(createStudentLikeDto);
  }

  @Post('startup')
  @UsePipes(new ValidationPipe())
  startupLikesStudent(@Body() createStartupLikeDto: CreateStartupLikeDto) {
    return this.likeService.startupLikesStudent(createStartupLikeDto);
  }

  @Get('student/:studentId')
  getStudentLikes(@Param('studentId') studentId: string) {
    return this.likeService.getStudentLikes(+studentId);
  }

  @Get('startup/:startupId')
  getStartupLikes(@Param('startupId') startupId: string) {
    return this.likeService.getStartupLikes(+startupId);
  }

  @Get('offer/:offerId')
  getOfferLikes(@Param('offerId') offerId: string) {
    return this.likeService.getOfferLikes(+offerId);
  }

  @Get('match/:offerId')
    getOfferLikesWithMatch(@Param('offerId') offerId: string) {
    return this.likeService.getOfferLikesWithMatch(+offerId);
  }


  @Delete('student/:offerId/:studentId')
  removeStudentLike(@Param('offerId') offerId: string, @Param('studentId') studentId: string) {
    return this.likeService.removeStudentLike(+offerId, +studentId);
  }

  @Delete('startup/:studentId/:startupId')
  removeStartupLike(@Param('studentId') studentId: string, @Param('startupId') startupId: string) {
    return this.likeService.removeStartupLike(+studentId, +startupId);
  }
}