import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Flex,
  Wrap,
  FormHelperText
} from '@chakra-ui/react';
import { useStore } from '../../zustand/store';
const ProfileEvents = () => {
  const user = useStore((state) => state.user);

  return (
    <>
      <h2>You don`t have events in the meantime </h2>
    </>
  );
};

export default ProfileEvents;
