import { Icons } from "$lib/icons";

export type Production = {
    production_id: string;
    name: string;
    company: string;
};
export type Showing = {
    production_id: string;
    show_id: string;
    fields: ProductionField[];
};

export type ProductionField = {
    type: string;
    content: string;
};

export let defIcon = Icons.diamond;
export let typeIconMap = {
    location: Icons.locationOn,
    date: Icons.today
} as { [key: string]: string };

export function getIcon(type: string): string {
    return typeIconMap[type] ?? defIcon;
}
