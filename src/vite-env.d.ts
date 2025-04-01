/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@/*" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
  export const onMounted: (callback: () => void) => void;
  export const ref: <T>(value: T) => { value: T };
  export const computed: <T>(getter: () => T) => { value: T };
}

declare module "vue" {
  interface ComponentCustomProperties {
    $refs: { [key: string]: HTMLElement | any };
  }
}
