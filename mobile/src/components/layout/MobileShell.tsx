import React from 'react';
import BottomNav from './BottomNav';

interface MobileShellProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

export default function MobileShell({ children, hideNav = false }: MobileShellProps) {
  return (
    <div className="flex flex-col min-h-dvh bg-gray-50 max-w-[430px] mx-auto relative">
      <div className={`flex-1 flex flex-col ${hideNav ? '' : 'pb-16'}`}>{children}</div>
      {!hideNav && <BottomNav />}
    </div>
  );
}
