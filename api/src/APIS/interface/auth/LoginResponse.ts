export interface LoginResponse {
    status: boolean;
    message?: string;
    /**
     * JWT Token (Only provided if logon successful)
     */
    token?: string;
}
