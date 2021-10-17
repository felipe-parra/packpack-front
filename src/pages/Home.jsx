import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorComponent from "../components/ErrorComponent";
import List from "../components/List";
import Loading from "../components/Loading";
import { doGetAllUsers } from "../redux/ducks/users";

const HomePage = () => {
  const { users, isLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    dispatch(doGetAllUsers());
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    return fetchData;
  }, [fetchData]);

  return (
    <div>
      <h1>List of Users</h1>
      {error && <ErrorComponent />}
      {isLoading && <Loading />}
      {users.length > 0 && <List arrayItems={users} />}
    </div>
  );
};

export default HomePage;
