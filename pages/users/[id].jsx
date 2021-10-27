import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from '../../src/zustand/store';
import ProtectedRoute from '../../src/components/hoc/ProtectedRoute';
import { Tabs, TabList, Tab, TabPanel, TabPanels } from '@chakra-ui/react';
import ProfileEvents from '../../src/components/profile/ProfileEvents';
import EditProfile from '../../src/components/profile/EditProfile';
import MyNotifications from '../../src/components/profile/MyNotifications';

const Profile = () => {
  // eslint-disable-next-line
  const user = useStore((state) => state.user);
  return (
    <Tabs isFitted colorScheme='whatsapp'>
      <TabList>
        <Tab> اهم الاحداث</Tab>
        <Tab>تعديل معلومات الحساب</Tab>
        <Tab>اشعاراتي</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <ProfileEvents />
        </TabPanel>
        <TabPanel>
          <EditProfile />
        </TabPanel>
        <TabPanel>
          <MyNotifications />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProtectedRoute(Profile);
