const ErrorComponent = ({ message = "Something went wrong! Try again" }) => (
  <div className="container mt-5 alert alert-danger rounded">{message}</div>
);

export default ErrorComponent;
