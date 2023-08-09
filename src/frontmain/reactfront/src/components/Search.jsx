import React, {useState} from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";
import {useNavigate} from "react-router-dom";


const Search = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("검색어:", keyword);
    navigate(`/search?keyword=${keyword}`);

  };

  const onSearching = (props) => {
    const value = props.target.value;
    setKeyword(value);
  }
  return (
    <form className="search" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          id="search"
          name="search"
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={onSearching}
          required
        />
        <label className="visually-hidden" htmlFor="search"></label>
        <button
          className="btn btn-primary text-white"
          type="submit"
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
    </form>
  );
};
export default Search;
