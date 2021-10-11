import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from '../../src/zustand/store';
import ProtectedRoute from '../../src/components/hoc/ProtectedRoute';
const Profile = () => {
  // eslint-disable-next-line

  return (
    <div>
      <h2 style={{ background: 'red', width: '50%' }}>
        Profile pagasdasdsdsddsdsds
        dsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss sdsdasdas
        sd d sd s e
      </h2>
    </div>
  );
};

export default ProtectedRoute(Profile);
