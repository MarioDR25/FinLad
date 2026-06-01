export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export interface AuthResponseDto {
  message: string;
  success: boolean;
  token?: string;
  name?: string;
}
