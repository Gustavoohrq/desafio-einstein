import { Module } from '@nestjs/common';
import { SchedulingModule } from './scheduling/scheduling.module';
import { SlotController } from './slot/slot.controller';
import { SlotService } from './slot/slot.service';

@Module({
  imports: [SchedulingModule],
  controllers: [SlotController],
  providers: [SlotService],
})
export class AppModule {}
