import "vue-router";

declare module "vue-router" {
  // as you need to add more route meta stuff, add it here.
  interface RouteMeta {
    requiresAuth?: boolean;
    showHeader?: boolean;
    showFooter?: boolean;
  }
}
