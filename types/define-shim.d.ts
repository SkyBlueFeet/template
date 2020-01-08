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
