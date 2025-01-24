import type { Production, Showing } from "$lib/types/production";
import { derived, writable, type Writable } from "svelte/store";

export const production_info = writable<Production>({
    production_id: "production",
    name: "Production Name",
    company: "Theatre Company"
});

export const show_info = writable<Showing>({
    show_id: "production_2312253",
    fields: [
        { type: "location", content: "Venue Name" },
        { type: "date", content: "23rd December 2025 • 3pm" }
    ]
});

export const production_members = writable<ProductionMember[]>([
    {
        id: "sims",
        name: "Jonathan Sims",
        department: "Cast",
        role: "Head Archivist",
        icon: "https://pbs.twimg.com/profile_images/1007734613630947330/rj3Jkwed_400x400.jpg"
    },
    {
        id: "blackwood",
        name: "Martin Blackwood",
        department: "Cast",
        role: "Archival Assistant"
    },
    { id: "bouchard", name: "Elias Bouchard", department: "Cast", role: "Head of Magnus" },
    { id: "king", name: "Melanie King", department: "Crew", role: "LX Operator" },
    { id: "lukas", name: "Peter Lukas", department: "Crew", role: "SFX Operator" },
    { id: "georgie", name: "Georgie Barker", department: "Crew", role: "AV Operator" },
    { id: "leitner", name: "Jurgen Leitner", department: "Crew", role: "ASM" },
    { id: "gerry", name: "Gerard Keay", department: "Crew", role: "Front of House" }
]);

export const production_departments = derived<Writable<ProductionMember[]>, Set<string>>(
    production_members,
    ($production_members, set, update) => {
        set(new Set($production_members.map((it) => it.department)));
    }
);
