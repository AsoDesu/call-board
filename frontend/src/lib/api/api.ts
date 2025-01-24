import { production_info, show_info } from "$lib/state/production_state";
import { saveSignInState } from "$lib/state/sign_in_state";
import { wait } from "$lib/utils";
import { fromStore } from "svelte/store";

export let api = {
    signIn: async (member: ProductionMember) => {
        let production_id = fromStore(production_info).current.production_id;
        let show_id = fromStore(show_info).current.show_id;
        await wait(2000);
        saveSignInState({ production_id, show_id, member_id: member.id, member_info: member });
    }
};
