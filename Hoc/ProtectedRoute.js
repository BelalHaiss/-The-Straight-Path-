import { useRouter } from 'next/router';
import { connect } from 'react-redux';
const protectedRoute = (ProtectedComponent, { user }) => {
  // eslint-disable-next-line
  return (props) => {
    const Router = useRouter();
    if (typeof window !== 'undefined') {
      console.log(user);
      if (user === null) {
        Router.replace('/');
        return null;
      } else {
        return <ProtectedComponent {...props} />;
      }
    }

    return null;
  };
};
const mapStateToProps = (state) => ({
  user: state.main.user
});

export default connect(mapStateToProps)(protectedRoute);
