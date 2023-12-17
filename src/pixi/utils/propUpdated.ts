export function propUpdated(props: any, oldProps: any, keys: string[]) {
    return keys.reduce((a, b) => {
        if (a) {
            return a;
        } else return props[b] !== oldProps[b];
    }, false);
}
