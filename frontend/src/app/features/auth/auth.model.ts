export interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface GoogleLoginDto {
  idToken: string;
}

export interface AuthResponseDto {
  message: string;
  success: boolean;
  token?: string;
  name?: string;
}

export interface GoogleResponse {
  credential: string;
  select_by: string;
  clientId: string;
}

export interface GoogleAccountsId {
  initialize: (config: { client_id: string; callback: (response: GoogleResponse) => void }) => void;
  prompt: () => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: GoogleAccountsId;
      };
    };
  }
}
