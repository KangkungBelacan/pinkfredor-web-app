export interface LoginResponse {
    status: boolean;
    message?: string;
    
    // JWT Signed token
    token?:string;
}
