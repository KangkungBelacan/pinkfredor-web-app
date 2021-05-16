import { AppUser } from "./../../APIS/interface/firebase/AppUser";

export default interface RequestStatus {
    /**
     * Indicate if this is a valid request
     */
    valid: boolean;

    /**
     * Indicate if token has expired
     */
    expired: boolean;

    /**
     * Reason if this request is invalid
     */
    message?: string;

    /**
     * Authenticated user if request is valid
     */
    user?: AppUser;
}