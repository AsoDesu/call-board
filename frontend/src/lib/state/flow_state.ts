import { writable } from "svelte/store";

export const department_selected = writable<string>();
export const selected_member = writable<ProductionMember | null>(null);
