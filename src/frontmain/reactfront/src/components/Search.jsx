import React, {useState} from "react";
import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";

const Search = () => {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 기본 제출 동작 막기
    // 여기서 keyword 변수를 사용하여 원하는 메서드를 호출하거나 다른 작업을 수행합니다.
    console.log("검색어:", keyword);

    try {

    }catch(error){
      console.error(error);
    }
  };

  const onSearching = (props) => {
    const value = props.target.value;
    setKeyword(value);
  }
  return (
    <form action="#" className="search" onSubmit={handleSubmit}>
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
