const log = (color: string, ...args: any[]) => console.log(color, ...args);
export const blue = (...args: any[]) => log("\x1b[34m%s\x1b[0m", ...args);
export const red = (...args: any[]) => log("\x1b[31m%s\x1b[0m", ...args);
export const green = (...args: any[]) => log("\x1b[32m%s\x1b[0m", ...args);

