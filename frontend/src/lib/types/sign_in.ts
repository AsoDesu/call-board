import type { Expiry } from "./common";

export type SignInStateCache = {
    [key: string]: ExpiringSignInState;
};

export type SignInState = {
    production_id: string;
    show_id: string;
    member_id: string;
    member_info: ProductionMember;
};

export type ExpiringSignInState = SignInState & Expiry;
