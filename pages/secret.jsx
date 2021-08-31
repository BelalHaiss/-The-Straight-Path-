import protectedRoute from '../Hoc/ProtectedRoute';

const secret = (props) => {
  return <div>you shouldn`t see me</div>;
};

export default protectedRoute(secret);
