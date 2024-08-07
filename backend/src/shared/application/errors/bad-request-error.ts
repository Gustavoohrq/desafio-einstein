import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = 'BadRequestError';
  }
}
