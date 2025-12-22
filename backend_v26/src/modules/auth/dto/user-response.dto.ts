export class UserResponseDto {
  id: string;
  fullName: string;
  rollNo: string;
  collegeName: string;
  mobile: string;
  email: string;
  degree: string;
  semester: number;
  createdAt: Date;
  updatedAt: Date;
}

export class PrivateUserResponseDto extends UserResponseDto {
  passwordHash: string;
}
