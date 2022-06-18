import logo from "./logo.svg";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import { objToQueryParams } from "./utils/util";
import Card from "./components/Card/Card";

/* API URL */
const API_URL = {
  local: "http://localhost:3000",
  prod: "http://15.165.160.72:3000",
};

// let params = {
//   keyword: searchKeyword,
//   lang: systemLang,
// };

function App() {
  const [query, setQuery] = useState();
  const [version, setVersion] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const onSelectOption = (e) => {
    setVersion(e.target.value);
  };

  const onSearch = async () => {
    const q = objToQueryParams({
      keyword: query,
      lang: version,
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
      <Header />
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <select onChange={onSelectOption}>
          <option value="en">KJV</option>
          <option value="ko">개역개정</option>
        </select>
        <input
          type="text"
          placeholder="enter the phrase"
          onChange={handleSearchInput}
        />
        <button onClick={() => onSearch()}>Search</button>

        <ul className="flex flex-col space-y-4">
          {isLoading ? (
            <LoadingIndicator />
          ) : !results ? (
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
      <Footer />
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
