import { useCallback, useEffect, useRef, useState } from "react";
import { objToQueryParams } from "./utils/util";
import Card from "./components/Card/Card";
import Searchbar from "./components/Searchbar";
import { useModal } from "./hooks/useModal";
import { Modal } from "./components/Modal";
import { useTranslation } from "react-i18next";
import { CardContainer } from "./components/Card/CardContainer";
import { debounce } from "./utils/debounce";
import ComboBox from "./components/Combobox";
import { bibleVersionOptions } from "./data/bible_version";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_DEV
    : process.env.REACT_APP_API_PROD;

function App() {
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "search",
  });

  const { isShowing, hide, open, msg } = useModal();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [results, setResults] = useState(null);

  const [hasMore, setHasMore] = useState(false);
  const [mode, setMode] = useState("range");
  const [total, setTotal] = useState(0);
  const [limit, _] = useState(10);
  const [pageNum, setPageNum] = useState(1);

  const [bibleVersion, setBibleVersion] = useState(
    i18n ? bibleVersionOptions[i18n.language][0] : {}
  );

  function InitArea() {
    return (
      <div className=" w-full pl-6 pr-3 py-4 sm:py-4 bg-gray-50 rounded-md leading-5 text-gray-300 placeholder-gray-400 sm:text-sm mt-6 text-gray-500 font-light prose prose-indigo prose-lg">
        <p> {t("helper.text")}:</p>
        <ul>
          <li>{t("helper.ex1")}</li>
          <li>{t("helper.ex2")}</li>
          <li>{t("helper.ex3")}</li>
        </ul>
      </div>
    );
  }

  function EmptyResults({ keyword }) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-lg font-light">
          {t("no_result_msg")} <span className="font-bold">"{keyword}"</span>
        </p>
      </div>
    );
  }

  function LoadingIndicator() {
    return <div>Loading...</div>;
  }

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

  // useEffect(() => {
  //   if (hasMore) {
  //     debounce(
  //       loadMore(query, i18n.language, pageNum, bibleVersion.value),
  //       500
  //     );
  //   }
  // }, [pageNum]);

  const onSearch = async () => {
    const q = objToQueryParams({
      keyword: query,
      lang: i18n.language,
      v: bibleVersion.value,
    });

    try {
      setIsLoading(true);

      let res = await fetch(`${API_URL}/bible?${q}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      res = await res.json();

      setMode(res.mode);
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

      console.log(res);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const loadMore = async (keyword, lang, page, version) => {
    const q = objToQueryParams({
      keyword,
      lang,
      page,
      v: version,
    });

    try {
      setIsLoading(true);
      let res = await fetch(`${API_URL}/bible?${q}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      });

      res = await res.json();
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
      <div className="mt-20 min-w-[400px] min-h-[600px] flex flex-col justify-center items-center max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
        <div className="flex w-full justify-center space-x-6 max-w-3xl">
          <ComboBox
            selectedOption={bibleVersion}
            setOption={setBibleVersion}
            options={bibleVersionOptions[i18n.language]}
          />
          <Searchbar
            ref={inputRef}
            placeholder={t("placeholder")}
            value={query}
            onChange={handleSearchInput}
            onClose={onClearInput}
            onKeydownEnter={onKeyDownEnter}
          />
        </div>

        <div
          className="flex w-full justify-center items-center space-x-6  mx-auto
      space-y-4 my-4"
        >
          {isLoading ? (
            <LoadingIndicator />
          ) : results ? (
            !results.length && !isEntering ? (
              <EmptyResults keyword={query} />
            ) : (
              <CardContainer>
                {mode === "include" ? (
                  <div className="font-light text-lg text-center">
                    {i18n.language === "en" && "Total "}
                    <span className="font-bold ">{total}</span>{" "}
                    {t("result_msg")}
                  </div>
                ) : (
                  <></>
                )}
                {results.map((elem, id) => {
                  const isLastElement = results.length - 1 === id + 1;
                  return isLastElement ? (
                    <div key={id} ref={lastElementRef}>
                      <Card data={elem} onClick={open} />
                    </div>
                  ) : (
                    <div key={id}>
                      <Card data={elem} onClick={open} />
                    </div>
                  );
                })}
              </CardContainer>
            )
          ) : (
            <InitArea />
          )}
        </div>

        <Modal isShowing={isShowing} hide={hide} msg={msg} />
      </div>
    </>
  );
}

export default App;
