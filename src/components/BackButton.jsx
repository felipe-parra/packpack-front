import { useHistory } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";

const BackButton = () => {
  const { goBack } = useHistory();
  return (
    <button
      onClick={() => {
        goBack();
      }}
      className="btn btn-sm btn-danger rounded"
    >
      <MdOutlineArrowBack /> Back
    </button>
  );
};

export default BackButton;
