import { loadIcons } from "@iconify/svelte";
import { Icon } from "@smui/button";

let iconList: string[] = [];

function icon(str: string): string {
    let iconName = "material-symbols:" + str;
    iconList.push(iconName);
    return iconName;
}

export const Icons = {
    developerBoard: icon("developer-board-outline"),
    engineering: icon("engineering-outline-rounded"),
    person: icon("person-outline-rounded"),
    doneAll: icon("done-all-rounded"),
    locationOn: icon("location-on-outline-rounded"),
    today: icon("today-outline-rounded"),
    diamond: icon("diamond-outline-rounded"),
    search: icon("search"),
    howToReg: icon("how-to-reg-outline-rounded")
};

export async function preloadIcons(): Promise<void> {
    return new Promise((resolve) => {
        loadIcons(iconList, () => resolve());
    });
}
