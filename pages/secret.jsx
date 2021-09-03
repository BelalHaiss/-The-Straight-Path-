import protectedRoute from '../Hoc/ProtectedRoute';
import { connect } from 'react-redux';
const secret = ({ user }) => {
  return <div>you shouldn`t see me</div>;
};
const mapStateToProps = (state) => ({
  user: state.main.user
});
export default connect(mapStateToProps)(protectedRoute(secret));
