import { TransformFnParams } from 'class-transformer';

export function TransformToLowercase({ value }: TransformFnParams) {
  return value.toLowerCase();
}
