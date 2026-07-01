import { ReactNode } from 'react';
import BottomNav from './BottomNav';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className="app-shell"><main className="main">{children}</main><BottomNav /></div>;
}
