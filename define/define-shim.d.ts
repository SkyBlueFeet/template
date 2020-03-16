declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

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

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.ejs" {
  type ejs = (
    data?: Record<string, unknown> | Array<unknown> | unknown
  ) => string;
  const Ejs: ejs;
  export default Ejs;
}
