
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from "src/components/list/Search.module.css";



interface SearchProps {
  onChangeTodoSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ onChangeTodoSearch }) => {
  return (
    <>
      <div
      className = { styles.form } >
        <FontAwesomeIcon
        className = { styles.icon }
        icon = { faSearch }
        size = "lg" />

        <input
        className = { styles.input }
        type = "text"
        placeholder = "투두 찾기"
        onChange = { (event: React.ChangeEvent<HTMLInputElement>) =>  {
          onChangeTodoSearch(event);
        }}/>
      </div>
    </>
  );
};

export default Search;