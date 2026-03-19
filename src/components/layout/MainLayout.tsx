import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Desktop Only */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header removed */}

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-0 md:p-2 md:p-16 py-20 md:py-16">
          {children}
        </main>
      </div>

      {/* Mobile Navigation - Mobile Only */}
      <MobileNav />
    </div>
  );
}

export default MainLayout;

