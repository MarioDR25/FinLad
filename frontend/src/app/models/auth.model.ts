export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  message: string;
  success: boolean;
  token?: string;
  name?: string;
}
