import { Controller, Get, Query } from '@nestjs/common';
import { SlotService } from './slot.service';

@Controller('slots')
export class SlotController {
    constructor(private slotService: SlotService) { }

    @Get()
    async getSlots(@Query('type') type: 'completa' | 'simples') {
        return this.slotService.getSlots(type);
    }
}
