import { initializeApp, type FirebaseApp, type FirebaseOptions } from "firebase/app";
import type { Api } from "./api";
import { doc, Firestore, getDoc, getFirestore } from "firebase/firestore";
import type { Production, Showing } from "$lib/types/production";
import { fromStore } from "svelte/store";
import { production_info, show_info } from "$lib/state/production_state";
import { wait } from "$lib/utils";
import { saveSignInState } from "$lib/state/sign_in_state";

export class FirebaseApi implements Api {
    app: FirebaseApp;
    firestore: Firestore;

    constructor(options: FirebaseOptions) {
        this.app = initializeApp(options);
        this.firestore = getFirestore(this.app);
    }

    async getShow(show_id: string) {
        return this._getDocument<Showing>("shows", show_id);
    }

    async getProduction(production_id: string) {
        return this._getDocument<Production>("productions", production_id);
    }

    async signIn(member: ProductionMember) {
        let production_id = fromStore(production_info).current.production_id;
        let show_id = fromStore(show_info).current.show_id;
        await wait(2000);
        saveSignInState({ production_id, show_id, member_id: member.id, member_info: member });
    }

    private async _getDocument<T>(path: string, ...pathSegments: string[]): Promise<T> {
        let docRef = await getDoc(doc(this.firestore, path, ...pathSegments));
        if (!docRef.exists()) throw Error("Not Found");
        return docRef.data() as T;
    }
}
