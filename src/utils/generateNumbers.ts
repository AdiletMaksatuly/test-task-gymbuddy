export const generateNumbers = (maxCount: number) => {
    return Array.from(
        { length: maxCount },
        (value, index) => index + 1
    );
}