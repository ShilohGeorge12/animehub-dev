import { useMyContext } from '../../context';
import { Navigate, Outlet } from 'react-router-dom';

function Auth() {
	const {
		state: { loggedIn },
	} = useMyContext();
	return loggedIn ? <Outlet /> : <Navigate to={'/login'} />;
}

export default Auth;
