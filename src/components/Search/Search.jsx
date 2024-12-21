import { useRef } from "react";
import Icons from "../Icons/Icons";
import "./search.scss";
const Search = ({ search, handleSearch, isMobile = false }) => {
  const inputFocusRef = useRef();
  const handleInputFocus = () => {
    inputFocusRef.current.focus();
  };
  return (
    <div className="tl__search tl-border" onClick={handleInputFocus}>
      <div className="tl__search-container">
        {!isMobile && <Icons type="search" w="25" h="25" />}

        <input value={search} onChange={handleSearch} ref={inputFocusRef} type="text" placeholder="Search..." />
      </div>
    </div>
  );
};
export default Search;
