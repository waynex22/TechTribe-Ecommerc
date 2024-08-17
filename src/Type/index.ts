export interface Route {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }> | null;
  children?: Route[];
  needChat?: boolean;
  }
export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}