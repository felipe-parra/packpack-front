import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { doDeleteUserAction } from "../redux/ducks/users";
const Item = ({ _id, name, mail, phone, age, gender, hobbies, createdAt }) => {
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    console.log("clicked");
    dispatch(doDeleteUserAction({ id }));
  };
  return (
    <tr>
      <th scope="row">
        <Link to={`/users/edit/${_id}`}>
          <FaEdit />
        </Link>
        |{" "}
        <span onClick={() => handleDeleteItem(_id)}>
          <FaTrashAlt />
        </span>
      </th>
      <td>{name}</td>
      <td>{mail}</td>
      <td>{phone}</td>
      <td>{age}</td>
      <td>{gender}</td>
      <td>{hobbies}</td>
      <td>{new Date(createdAt).toISOString().slice(0, 19)}</td>
    </tr>
  );
};

export default Item;
