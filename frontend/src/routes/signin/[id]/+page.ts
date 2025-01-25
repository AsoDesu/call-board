import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const ssr = false;
export const load: PageLoad = ({ params }) => {
    return { show_id: params.id };
};
