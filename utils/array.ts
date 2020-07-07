export const sort = <T extends unknown>(array: T[], property: string) => {
    return array.sort((a, b) => {
        if (a[property] < b[property]) {
            return 1;
        }
        if (b[property] < a[property]) {
            return -1;
        }
        return 0;
    });
}