import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { NotificationDrawer } from './NotificationDrawer';

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-surface-bg flex flex-col font-sans">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
      <NotificationDrawer />
    </div>
  );
};
