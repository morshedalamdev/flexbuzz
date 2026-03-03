export enum StatusType {
  DEFAULT = "default",
  SUCCESS = "success",
  INFO = "info",
  ERROR = "error",
  WARNING = "warning",
}


export interface SignupState {
  errors?: {
    username?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  status?: StatusType;
  message?: string;
  username?: string;
  email?: string;
}

export interface LoginState {
  errors?: {
    username?: string[];
    password?: string[];
  };
  status?: StatusType;
  message?: string;
  username?: string;
}