import Item from "./Item";

const List = ({ arrayItems = [] }) => {
  if (arrayItems.length === 0) {
    return null;
  }
  return (
    <table className="table table-responsive-sm">
      <thead>
        <tr>
          <th scope="col">Actions</th>
          <th scope="col">Name</th>
          <th scope="col">Mail</th>
          <th scope="col">Phone</th>
          <th scope="col">Age</th>
          <th scope="col">Gender</th>
          <th scope="col">Hobbies</th>
          <th scope="col">Creation Date</th>
        </tr>
      </thead>
      <tbody>
        {arrayItems.map((item) => (
          <Item {...item} key={item._id} />
        ))}
      </tbody>
    </table>
  );
};

export default List;
