export interface Route {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType<{ children: React.ReactNode }> | null;
  children?: Route[];
  }
export interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  show: boolean;
  onClose: () => void;
}