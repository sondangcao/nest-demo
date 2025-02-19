import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerException extends HttpException {
  constructor() {
    super('INTERNAL_SERVER_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
