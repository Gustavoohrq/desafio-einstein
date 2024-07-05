import { Injectable } from '@nestjs/common';
import { CreateSchedulingDto } from './dto/create-scheduling.dto';
import { UpdateSchedulingDto } from './dto/update-scheduling.dto';
import { PrismaService } from 'src/shared/infrastructure/database/prisma/prisma.service';
import { BadRequestError } from 'src/shared/application/errors/bad-request-error';
import { WashType } from '@prisma/client';

@Injectable()
export class SchedulingService {
  constructor(private prisma: PrismaService) { }

  async create(createAppointmentDto: CreateSchedulingDto) {
    const inputDate = new Date(createAppointmentDto.date);
    this.validateAppointmentTime(inputDate, createAppointmentDto.time);
    const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));
    const conflictingAppointment = await this.prisma.scheduling.findMany({
      where: {
        time: createAppointmentDto.time,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        }
      }
    })
    if (conflictingAppointment.length > 0) {
      throw new BadRequestError(`Já existe um agendamento para a data ${inputDate.toISOString().split('T')[0]} às ${createAppointmentDto.time}. Por favor, escolha outro horário.`);
    }
    return this.prisma.scheduling.create({
      data: {
        licensePlate: createAppointmentDto.licensePlate,
        date: inputDate,
        time: createAppointmentDto.time,
        type: createAppointmentDto.type as WashType,
        status: 'Em_Aberto'
      },
    });
  }

  private validateAppointmentTime(date: Date, time: string): void {
    const dayOfWeek = date.getDay();
    const hour = time.split(':')[0];
    if (dayOfWeek === 0 || dayOfWeek === 6 || parseInt(hour) < 10 || parseInt(hour) >= 18 || (parseInt(hour) >= 12 && parseInt(hour) < 13)) {
      throw new BadRequestError('O agendamento só está disponível de segunda a sexta-feira, das 10h às 18h, com uma pausa das 12h às 13h. Por favor, selecione um horário dentro deste intervalo para prosseguir com o agendamento.');
    }

  }
  findAll() {
    return this.prisma.scheduling.findMany();
  }

  findOne(id: string) {
    return this.prisma.scheduling.findFirst({ where: { id } });
  }

  
  confirmationSchedule(id: string) {
    return this.prisma.scheduling.update({
      where: { id }, data: {
        status: 'Confirmado'
      }
    })
  }

  cancel(id: string) {
    return this.prisma.scheduling.update({
      where: { id }, data: {
        status: 'Cancelado'
      }
    })
  }
}
