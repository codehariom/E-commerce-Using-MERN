import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add a loading state
  }

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;