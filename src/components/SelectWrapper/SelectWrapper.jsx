import Select from "react-select";
import Icons from "../Icons/Icons";
import "./selectWrapper.scss";
const SelectWrapper = ({ components, onChange, value, options, isDisabled }) => {
  const customStyles = {
    menu: (provided) => ({
      ...provided,
      width: "100%", // Ensure the dropdown menu is also 100% width
    }),
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isDisabled ? "transparent" : provided.backgroundColor,
      border: "none",
      borderBottom: "1px solid var(--tl-theme-border)",
      padding: 0,
      boxShadow: "none",
      "&:hover": {
        border: "none",
        borderBottom: "1px solid var(--tl-theme-border)",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: 0,
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };
  return (
    <div className="tl-task__tags">
      <Select
        components={components}
        closeMenuOnSelect={false}
        styles={customStyles}
        placeholder="Tags"
        onChange={onChange}
        isSearchable={false}
        value={value}
        isMulti={true}
        options={options}
        isDisabled={isDisabled}
      />
    </div>
  );
};
export default SelectWrapper;
