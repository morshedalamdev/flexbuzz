import type { StatusType } from ".";

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    status: StatusType;
    message: string;
}

export interface SignupRequest {
    username: string;
    email: string;
    password: string;
}

export interface SignupResponse {
    status: StatusType;
    message: string;
}