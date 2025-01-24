// https://stackoverflow.com/questions/24173245/javascript-array-sort-by-last-name-first-name
export const compareName = (a: string, b: string) => {
    const splitA = a.split(" ");
    const splitB = b.split(" ");
    const lastA = splitA[splitA.length - 1];
    const lastB = splitB[splitB.length - 1];

    return lastA === lastB ? splitA[0].localeCompare(splitB[0]) : lastA.localeCompare(lastB);
};

export function seperateArray<T>(array: T[], filter: (it: T) => boolean): T[][] {
    let trueArray: T[] = [];
    let falseArray: T[] = [];
    for (const it of array) {
        if (filter(it)) trueArray.push(it);
        else falseArray.push(it);
    }
    return [trueArray, falseArray];
}

export function containsIgnoreCase(a: string, b: string) {
    return a.toLowerCase().includes(b.toLowerCase());
}

export function wait(millis: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), millis);
    });
}
