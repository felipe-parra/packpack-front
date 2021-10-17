import { Fragment } from "react/cjs/react.production.min";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <Fragment>
      <Navbar />
      <div className="container-fluid">{children}</div>
    </Fragment>
  );
};

export default Layout;
