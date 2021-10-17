import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ path, component, ...rest }) {
  const { auth } = useSelector((state) => state);

  if (auth.isLogged) {
    return <Route path={path} component={component} {...rest} />;
  } else {
    return <Redirect to="/login" {...rest} />;
  }
}
