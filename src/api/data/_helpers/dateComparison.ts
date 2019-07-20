import { Between } from 'typeorm';
import { addMinutes } from 'date-fns'
export const NextMinute = (date: Date) => Between(date, addMinutes(date, 1))