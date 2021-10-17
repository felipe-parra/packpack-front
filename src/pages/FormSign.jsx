import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import BackButton from "../components/BackButton";
import ErrorComponent from "../components/ErrorComponent";
import { LoginFields, LoginState } from "../components/LoginFields";
import { SignUpFields, SignUpState } from "../components/SignUpFields";
import { capitalize } from "../helpers";
import {
  doLoginWithEmailAndPasswordAction,
  doSignUpWithEmailAndPasswordAction,
} from "../redux/ducks/auth";

const FormSign = () => {
  const [state, setstate] = useState({ ...LoginState, ...SignUpState });
  const [typeForm, setTypeForm] = useState("login");
  const [saveSession, setsaveSession] = useState(false);
  const history = useHistory();
  const {
    isLogged,
    isLoading,
    error: errorAuth,
  } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setstate({
      ...state,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (typeForm === "login") {
      dispatch(doLoginWithEmailAndPasswordAction({ ...state, saveSession }));
    } else {
      dispatch(doSignUpWithEmailAndPasswordAction({ user: state }));
    }
    setstate({ ...LoginState, ...SignUpState });
  };
  const handleForm = useCallback(() => {
    setTypeForm(pathname.split("/")[1]);
  }, [setTypeForm, pathname]);

  useEffect(() => {
    handleForm();
    if (isLogged) {
      history.push("/");
    }
    return handleForm;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleForm, isLogged]);

  return (
    <form
      onSubmit={handleSubmit}
      className="container mt-1 col-12 col-md-6 col-lg-4"
    >
      <div className="d-flex justify-content-between">
        <h1 className="text-center">{typeForm}</h1>
        {typeForm !== "login" && <BackButton />}
      </div>
      {errorAuth && <ErrorComponent />}
      {typeForm === "login" &&
        LoginFields.map(({ id, name, placeholder, type, required }) => {
          return (
            <div className="form-group" key={`key-form-gruop-${id}`}>
              <label htmlFor={name}>{capitalize({ str: name })}</label>
              <div className="d-flex align-items-center">
                <input
                  name={name}
                  className="form-control rounded"
                  type={type}
                  value={state[name]}
                  onChange={handleChange}
                  required={required}
                  placeholder={placeholder}
                />
              </div>
            </div>
          );
        })}
      {typeForm === "register" &&
        SignUpFields.map(({ id, name, placeholder, type }) => {
          return (
            <div className="form-group" key={`key-form-gruop-${id}`}>
              <label htmlFor={name}>{capitalize({ str: name })}</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  className="form-control rounded"
                  type={type}
                  value={state[name]}
                  onChange={handleChange}
                ></textarea>
              ) : (
                <input
                  name={name}
                  className="form-control rounded"
                  type={type}
                  value={state[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                />
              )}
            </div>
          );
        })}
      {typeForm === "login" && (
        <p className="mt-2 d-flex align-items-center justify-content-end">
          {"Remember me?  "}
          <input
            style={{ accentColor: "red", marginLeft: "0.5rem" }}
            type="checkbox"
            value={saveSession}
            onChange={(e) => setsaveSession(e.target.checked)}
          />
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary btn-block rounded"
        disabled={isLoading}
      >
        {typeForm}
      </button>
      {typeForm === "login" && (
        <p className="mb-2 text-right">
          <Link to="/register">Don't have account?, Register</Link>
        </p>
      )}
    </form>
  );
};

export default FormSign;
