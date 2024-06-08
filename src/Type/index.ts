export interface Route {
    path: string;
    component: React.FC<any>;
    layout: React.FC<any> | null;
  }