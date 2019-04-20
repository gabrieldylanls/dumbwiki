export class CreateAdminDto {
  readonly fullName: string;
  readonly userName: string;
  readonly email: string;
  readonly password: string;
  readonly photo: string;
  readonly birthDay: Date;
}