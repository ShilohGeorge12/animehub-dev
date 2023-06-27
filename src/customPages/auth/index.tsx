import { useContextApi } from "../../context";
import { Navigate, Outlet } from "react-router-dom";

function Auth (  ) {
  const { state: { loggedIn } } = useContextApi()
  return loggedIn ? <Outlet/> : <Navigate to={'/'}/>
};

export default Auth;