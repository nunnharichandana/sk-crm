import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New High Priority Lead',
      message: 'Kavita Menon requested 1 Cr Term Plan quotation.',
      time: '10 mins ago',
      read: false,
      type: 'LEAD'
    },
    {
      id: 2,
      title: 'Follow-up Due',
      message: 'Call Rahul Dravid regarding Star Health floaters.',
      time: '45 mins ago',
      read: false,
      type: 'FOLLOWUP'
    },
    {
      id: 3,
      title: 'Policy Issued',
      message: 'POL-HDFC-2026-78901 generated for Neha Agarwal.',
      time: '2 hours ago',
      read: true,
      type: 'POLICY'
    },
    {
      id: 4,
      title: 'Renewal Notice',
      message: 'POL-STAR-2025-45612 expires in 12 days.',
      time: '5 hours ago',
      read: true,
      type: 'RENEWAL'
    }
  ]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const addNotification = (notif) => {
    setNotifications(prev => [
      {
        id: Date.now(),
        time: 'Just now',
        read: false,
        ...notif
      },
      ...prev
    ]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isDrawerOpen,
        setIsDrawerOpen,
        markAllAsRead,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
