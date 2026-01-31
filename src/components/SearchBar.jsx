import "./SearchBar.css";

const SearchBar = ({ value, onChange, placeholder = "Search ideas..." }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
      />
    </div>
  );
};

export default SearchBar;
