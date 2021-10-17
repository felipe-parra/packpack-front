import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BackButton from "../components/BackButton";
import { SignUpFields, SignUpState } from "../components/SignUpFields";
import { capitalize, getTypeOfLocation } from "../helpers";
import { doCreateOneUser } from "../redux/ducks/users";

const FormUser = () => {
  const [state, setState] = useState({ ...SignUpState });
  const { pathname } = useLocation();
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      String(
        getTypeOfLocation({ str: pathname, position: 2 })
      ).toLowerCase() === "create"
    ) {
      dispatch(doCreateOneUser({ ...state }));
      setState({ ...SignUpState });
    }
  };
  useEffect(() => {}, []);
  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-1 col-12 col-md-6 col-lg-4"
    >
      <div className="d-flex justify-content-between">
        <h1>{getTypeOfLocation({ str: pathname, position: 2 })}</h1>
        <BackButton />
      </div>
      {SignUpFields.map(({ id, name, placeholder, type, required }) => {
        return (
          <div className="form-group" key={`key-form-gruop-${id}`}>
            <label className="font-weight-bold" htmlFor={name}>
              {capitalize({ str: name })}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                className="form-control rounded"
                type={type}
                value={state[name]}
                onChange={handleChange}
                placeholder={placeholder}
              ></textarea>
            ) : (
              <input
                name={name}
                className="form-control rounded bg-light"
                type={type}
                value={state[name]}
                placeholder={placeholder}
                onChange={handleChange}
                required={required}
              />
            )}
          </div>
        );
      })}{" "}
      <button
        type="submit"
        className="btn btn-primary btn-block rounded"
        disabled={isLoading}
      >
        {getTypeOfLocation({ str: pathname, position: 2 })}
      </button>
    </form>
  );
};

export default FormUser;
