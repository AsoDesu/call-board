import { derived, writable, type Writable } from "svelte/store";

export const production_info = writable({
    name: "Production Name",
    company: "Theatre Company"
});

export const show_info = writable({
    fields: [
        { type: "location", content: "Venue Name" },
        { type: "date", content: "23rd December 2025 • 3pm" }
    ]
});

export const production_members = writable<ProductionMember[]>([
    {
        name: "Jonathan Sims",
        department: "Cast",
        role: "Head Archivist",
        icon: "https://pbs.twimg.com/profile_images/1007734613630947330/rj3Jkwed_400x400.jpg"
    },
    {
        name: "Martin Blackwood",
        department: "Cast",
        role: "Archival Assistant"
    },
    { name: "Elias Bouchard", department: "Cast", role: "Head of Magnus" },
    { name: "Melanie King", department: "Crew", role: "LX Operator" },
    { name: "Peter Lukas", department: "Crew", role: "SFX Operator" },
    { name: "Georgie Barker", department: "Crew", role: "AV Operator" },
    { name: "Jurgen Leitner", department: "Crew", role: "ASM" },
    { name: "Gerard Keay", department: "Crew", role: "Front of House" }
]);

export const production_departments = derived<Writable<ProductionMember[]>, Set<string>>(
    production_members,
    ($production_members, set, update) => {
        set(new Set($production_members.map((it) => it.department)));
    }
);
