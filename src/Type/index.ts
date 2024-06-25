export interface Route {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }> | null;
  children?: Route[];
  }