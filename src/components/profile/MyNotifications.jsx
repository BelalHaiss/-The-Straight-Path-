import React from 'react';
import { useStore } from '../../zustand/store';
const MyNotifications = () => {
  const user = useStore((state) => state.user);
  return <div>All User MyNotificationsations</div>;
};

export default MyNotifications;
