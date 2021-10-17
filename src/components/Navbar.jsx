import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const links = [
  {
    name: "Users",
    url: "/",
  },
  {
    name: "New",
    url: "/users/create",
  },
];
const Navbar = () => {
  const { auth } = useSelector((state) => state);

  return (
    <nav className="navbar d-flex justify-content-between bg-dark text-white m-0">
      <Link to="/" className="">
        Home
      </Link>
      <ul className="d-flex flex-row justify-content-around m-1">
        <Link to={auth.isLogged ? "/account" : "/login"}>
          <li className="text-decoration-none">
            {auth.isLogged ? `Hi, ${auth.user.name}` : "Login"}
          </li>
        </Link>
        {/* TODO Login conditional */}
        {links.map(({ name, url }, id) => (
          <Link to={url} key={`navbar-key-${id}`}>
            <li className="text-decoration-none">{name}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
