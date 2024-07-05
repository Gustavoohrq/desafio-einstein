import { Injectable } from '@nestjs/common';

@Injectable()
export class SlotService {
  getSlots(type: 'completa' | 'simples') {
    const startMorning = '10:00';
    const endMorning = '12:00';
    const startAfternoon = '13:00';
    const endAfternoon = '18:00';

    const duration = type === 'completa' ? 45 : 30;
    
    const slots = [
      ...this.generateSlots(startMorning, endMorning, duration),
      ...this.generateSlots(startAfternoon, endAfternoon, duration),
    ];

    return slots;
  }

  private generateSlots(startTime: string, endTime: string, duration: number) {
    const slots = [];
    let currentTime = this.parseTime(startTime);

    while (currentTime < this.parseTime(endTime)) {
      slots.push(this.formatTime(currentTime));
      currentTime.setMinutes(currentTime.getMinutes() + duration);
    }

    return slots;
  }

  private parseTime(time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  }

  private formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
