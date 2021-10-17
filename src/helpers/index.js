export const capitalize = ({ str = "" }) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const handleInputChange = (e, setFunction) => {
  const { name, value } = e.target;
  setFunction((prevState) => ({
    ...prevState,
    [name]: value,
  }));
};

export const getTypeOfLocation = ({ str = "", splitter = "/", position = 1 }) =>
  str.split(splitter)[position];
