import { useRef, useState } from "react";
import Icons from "../Icons/Icons";
import "./search.scss";
const Search = ({ search, handleSearch, isMobile = false }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputFocusRef = useRef();
  const handleInputFocus = () => {
    setIsInputFocused(true);
    inputFocusRef.current.focus();
  };
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  return (
    <div tabIndex={0} className={`tl__search tl-border ${isMobile ? "tl__search--mobile" : ""} ${isInputFocused ? "tl__search--focused" : ""}`} onClick={handleInputFocus}>
      <div className="tl__search-container">
        {!isMobile && <Icons type="search" w="25" h="25" />}

        <input onFocus={() => handleInputFocus()} onBlur={() => handleInputBlur()} value={search} onChange={handleSearch} ref={inputFocusRef} type="text" placeholder="Search..." />
      </div>
    </div>
  );
};
export default Search;
