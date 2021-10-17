import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { doLogOut } from "../redux/ducks/auth";
import { doDeleteUserAction } from "../redux/ducks/users";
import { FaTrash } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Account = () => {
  const { user, isLogged } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = () => {
    dispatch(doLogOut());

    history.push("/login");
  };

  const handleDeleteAccount = () => {
    dispatch(doDeleteUserAction({ id: user["_id"] }));
    if (!isLogged) {
      history.push("/register");
    }
  };

  return (
    <div className="container">
      <h1 className="mt-5 text-center">Hi {user.name}</h1>
      <section className="d-flex justify-content-around ">
        <button
          onClick={handleLogout}
          className="btn btn-danger rounded mt-5 d-flex align-items-center"
        >
          Logout <BiLogOut />
        </button>
        <button
          onClick={handleDeleteAccount}
          className="btn btn-info rounded mt-5 d-flex align-items-center"
        >
          Delete Account &#32;
          <FaTrash />
        </button>
      </section>
    </div>
  );
};

export default Account;
