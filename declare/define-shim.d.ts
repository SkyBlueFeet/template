declare module "*.jsonc" {
    const content: JSON;
    export default content;
}

declare module "*.json5" {
    const content: JSON;
    export default content;
}

declare module "*.md" {
    const content: string;
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.ejs" {
    type ejs = (data?: unknown) => string;
    const Ejs: ejs;
    export default Ejs;
}
