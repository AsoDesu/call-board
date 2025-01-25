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

export function doAsync<T>(action: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await action());
        } catch (e: any) {
            reject(e);
        }
    });
}

// https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
export function ordinalSuffix(i: number) {
    let j = i % 10,
        k = i % 100;
    if (j === 1 && k !== 11) {
        return i + "st";
    }
    if (j === 2 && k !== 12) {
        return i + "nd";
    }
    if (j === 3 && k !== 13) {
        return i + "rd";
    }
    return i + "th";
}
