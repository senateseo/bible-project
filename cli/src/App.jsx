import { useRef, useState } from "react";
import { objToQueryParams } from "./utils/util";
import Card from "./components/Card/Card";
import ComboBox from "./components/Combobox";
import Searchbar from "./components/Searchbar";

/* API URL */
const API_URL = {
  local: "http://localhost:3000",
  prod: "http://15.165.160.72:3000",
};

// let params = {
//   keyword: searchKeyword,
//   lang: systemLang,
// };

const options = [
  {
    id: 0,
    name: "KJV",
    value: "en",
  },
  {
    id: 1,
    name: "개역개정",
    value: "ko",
  },
];

function App() {
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(options[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const onClearInput = () => {
    setQuery("");
    inputRef.current.focus();
  };

  const onKeyDownEnter = (e) => {
    if (e.code === "Enter") {
      onSearch();
    }
  };

  const onSearch = async () => {
    const q = objToQueryParams({
      keyword: query,
      lang: version.value,
    });

    try {
      setIsLoading(true);
      let res = await fetch(`${API_URL.prod}/bible?${q}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      res = await res.json();

      console.log(res);
      setResults(res.bible.rows);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-[784px] flex flex-col justify-center items-center max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className="flex w-full justify-center space-x-6 max-w-3xl">
          <ComboBox option={version} setOption={setVersion} options={options} />
          <Searchbar
            ref={inputRef}
            placeholder="Enter the phrase"
            value={query}
            onChange={handleSearchInput}
            onClose={onClearInput}
            onKeydownEnter={onKeyDownEnter}
          />
        </div>

        <ul className="flex flex-col space-y-4 max-w-3xl my-4">
          {isLoading ? (
            <LoadingIndicator />
          ) : !results.length ? (
            <EmptyResults />
          ) : (
            results.map((elem, id) => {
              return (
                <li key={id}>
                  <Card data={elem} />
                </li>
              );
            })
          )}
        </ul>
      </div>
    </>
  );
}

function EmptyResults() {
  return <div>No results</div>;
}

function LoadingIndicator() {
  return <div>Loading...</div>;
}

export default App;
