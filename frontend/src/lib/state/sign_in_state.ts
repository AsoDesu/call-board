import { browser } from "$app/environment";
import type { ExpiringSignInState, SignInState, SignInStateCache } from "$lib/types/sign_in";
import { json } from "@sveltejs/kit";
import { derived, fromStore, writable, type Writable } from "svelte/store";
import { production_info, show_info } from "./production_state";

const SIGN_IN_STATE_KEY = "sign_in_state";
const SIGN_IN_EXPIRES_IN = 1.21e9; // 14 days

export const sign_ins = writable<SignInStateCache>(updateSignInStateCache());
export const current_show_sign_in = derived<Writable<SignInStateCache>, SignInState | null>(
    sign_ins,
    (cache, set, update) => {
        set(getShowSignIn(cache));
    }
);
export const previous_show_sign_in = derived<Writable<SignInStateCache>, SignInState | null>(
    sign_ins,
    (cache, set, update) => {
        set(getPastShowSignIn(cache));
    }
);

export function getShowSignIn(cache: SignInStateCache) {
    let productionId = fromStore(production_info).current.production_id;
    let showId = fromStore(show_info).current.show_id;

    let lastSignIn = cache[productionId];

    if (lastSignIn == null) return null;
    if (lastSignIn.show_id != showId) return null;
    return lastSignIn;
}

export function getPastShowSignIn(cache: SignInStateCache) {
    let productionId = fromStore(production_info).current.production_id;

    let lastSignIn = cache[productionId];
    if (lastSignIn == null) return null;
    return lastSignIn;
}

function loadSignInStateCache(): SignInStateCache {
    if (!browser) return {};

    let stateString = localStorage.getItem(SIGN_IN_STATE_KEY) ?? "{}";
    let loadedState = JSON.parse(stateString);

    let state = {} as SignInStateCache;
    for (const production_id of Object.keys(loadedState)) {
        let sign_in = loadedState[production_id] as ExpiringSignInState;
        // check null
        if (!sign_in) continue;
        // check expiry
        if (sign_in.exp != null) {
            if (Date.now() > sign_in.exp) {
                console.log(`Removed sign in state due to expiry`, sign_in);
                continue;
            }
        }
        // validation
        if (sign_in.production_id == null) continue;
        if (sign_in.show_id == null) continue;
        if (sign_in.member_id == null) continue;
        if (sign_in.member_info == null) continue;
        state[sign_in.production_id] = sign_in;
    }
    return state;
}

function updateSignInStateCache() {
    let loadedState = loadSignInStateCache();
    if (browser) localStorage.setItem(SIGN_IN_STATE_KEY, JSON.stringify(loadedState));
    return loadedState;
}

export function saveSignInState(state: SignInState) {
    let expires = Date.now() + SIGN_IN_EXPIRES_IN;
    let expiringState = { ...state, exp: expires } as ExpiringSignInState;

    let cahce = loadSignInStateCache();
    cahce[state.production_id] = expiringState;
    if (browser) localStorage.setItem(SIGN_IN_STATE_KEY, JSON.stringify(cahce));
    sign_ins.set(cahce);
}
