import type { StatusType } from ".";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    status: StatusType;
    message: string;
}