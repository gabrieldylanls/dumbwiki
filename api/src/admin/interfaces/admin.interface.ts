import { Document } from 'mongoose';

export interface Admin extends Document {
  readonly id?: string;
  readonly fullName?: string;
  readonly userName?: string;
  readonly email?: string;
  readonly password?: string;
  readonly photo?: string;
  readonly birthDay?: Date;
  readonly createdAt?: Date;
}