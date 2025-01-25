import { writable } from "svelte/store";

export let flow = ["signin", "select_department", "select_human"];
export const flow_action = writable<string>("signin");

export const department_selected = writable<string>();
export const selected_member = writable<ProductionMember | null>(null);
