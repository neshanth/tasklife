import { useRef } from "react";
import Icons from "../Icons/Icons";
import "./search.scss";
const Search = () => {
  const inputFocusRef = useRef();
  const handleInputFocus = () => {
    inputFocusRef.current.focus();
  };
  return (
    <div className="tl__search tl-border" onClick={handleInputFocus}>
      <div className="tl__search-container">
        <Icons type="search" />
        <input ref={inputFocusRef} type="text" placeholder="Search Tasks" />
      </div>
    </div>
  );
};
export default Search;
