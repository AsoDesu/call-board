export type Production = {
    name: string;
    company: string;
    fields: ProductionField[];
};

export type ProductionField = {
    type: string;
    content: string;
};

export let defIcon = "diamond-outline-rounded";
export let typeIconMap = {
    location: "location-on-outline-rounded",
    date: "today-outline-rounded"
} as { [key: string]: string };

export function getIcon(type: string): string {
    return typeIconMap[type] ?? defIcon;
}