import { production_info, show_info } from "$lib/state/production_state";
import { saveSignInState } from "$lib/state/sign_in_state";
import { wait } from "$lib/utils";
import { fromStore } from "svelte/store";
import { PUBLIC_API_MODE, PUBLIC_FIREBASE_CONFIG } from "$env/static/public";
import { FirebaseApi } from "./firebase_api";
import type { Production, Showing } from "$lib/types/production";

export let api: Api = createApi();

function createApi() {
    switch (PUBLIC_API_MODE) {
        case "firebase":
            return new FirebaseApi(JSON.parse(PUBLIC_FIREBASE_CONFIG));
    }
    throw Error("No API mode configured");
}

export interface Api {
    getShow: (show_id: string) => Promise<Showing>;
    getProduction: (production_id: string) => Promise<Production>;
    signIn: (member: ProductionMember) => Promise<void>;
}
