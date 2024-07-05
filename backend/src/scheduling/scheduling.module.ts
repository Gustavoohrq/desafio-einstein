import { Module } from '@nestjs/common';
import { SchedulingService } from './scheduling.service';
import { SchedulingController } from './scheduling.controller';
import { PrismaService } from 'src/shared/infrastructure/database/prisma/prisma.service';

@Module({
  controllers: [SchedulingController],
  providers: [PrismaService, SchedulingService],
})
export class SchedulingModule {}
