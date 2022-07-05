import { useCallback, useEffect, useRef, useState } from "react";
import { objToQueryParams } from "./utils/util";
import Card from "./components/Card/Card";
import ComboBox from "./components/Combobox";
import Searchbar from "./components/Searchbar";
import { useModal } from "./hooks/useModal";
import { Modal } from "./components/Modal";

const API_URL = {
  local: "http://localhost:3000",
  prod: "http://15.165.160.72:3000",
};

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
  const { isShowing, hide, open, msg } = useModal();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(options[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [results, setResults] = useState(null);

  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  const handleSearchInput = (e) => {
    if (!isEntering) {
      setIsEntering(true);
    }
    setQuery(e.target.value);
  };

  const onClearInput = () => {
    setQuery("");
    inputRef.current.focus();
  };

  const onKeyDownEnter = (e) => {
    if (e.code === "Enter") {
      setIsEntering(false);
      onSearch();
    }
  };

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (hasMore) {
      loadMore(query, version.value, pageNum);
    }
  }, [pageNum]);

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

      if (res.mode === "include") {
        setResults(res.bible.rows);
        setTotal(res.bible.count);
        if (hasMoreQuotes(pageNum, limit, res.bible.count)) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } else {
        setResults(res.bible);
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const loadMore = async (keyword, lang, page) => {
    const q = objToQueryParams({
      keyword,
      lang,
      page,
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
      setResults((prev) => [...prev, ...res.bible.rows]);
      setTotal(res.bible.count);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const hasMoreQuotes = (page, limit, total) => {
    const startIndex = (page - 1) * limit + 1;
    return total === 0 || startIndex < total;
  };

  return (
    <>
      <div className="mt-20 min-h-[784px] flex flex-col justify-center items-center max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
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
          ) : results ? (
            !results.length && !isEntering ? (
              <EmptyResults keyword={query} />
            ) : (
              results.map((elem, id) => {
                const isLastElement = results.length === id + 1;
                return isLastElement ? (
                  <li key={id} ref={lastElementRef}>
                    <Card data={elem} onClick={open} />
                  </li>
                ) : (
                  <li key={id}>
                    <Card data={elem} onClick={open} />
                  </li>
                );
              })
            )
          ) : (
            <InitArea />
          )}
        </ul>

        <Modal isShowing={isShowing} hide={hide} msg={msg} />
      </div>
    </>
  );
}

function InitArea() {
  return (
    <div className="mt-6 text-gray-500 font-light prose prose-indigo prose-lg">
      <p> How to serach:</p>
      <ul>
        <li>john 3:16</li>
        <li>john 3:16-17</li>
        <li>Daniel</li>
      </ul>
    </div>
  );
}

function EmptyResults({ keyword }) {
  return (
    <div className="flex justify-center items-center p-4">
      <p className="text-lg font-light">No results for "{keyword}"</p>
    </div>
  );
}

function LoadingIndicator() {
  return <div>Loading...</div>;
}

export default App;
