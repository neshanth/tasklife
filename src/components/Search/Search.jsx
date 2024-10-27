import { useRef } from "react";
import Icons from "../Icons/Icons";
import "./search.scss";
const Search = ({ search, handleSearch }) => {
  const inputFocusRef = useRef();
  const handleInputFocus = () => {
    inputFocusRef.current.focus();
  };
  return (
    <div className="tl__search tl-border" onClick={handleInputFocus}>
      <div className="tl__search-container">
        <Icons type="search" />
        <input value={search} onChange={handleSearch} ref={inputFocusRef} type="text" placeholder="Search..." />
      </div>
    </div>
  );
};
export default Search;
