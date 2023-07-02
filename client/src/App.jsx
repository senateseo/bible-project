import { useCallback, useEffect, useRef, useState } from "react";
import { copyToClipboard, getSystemLang, objToQueryParams } from "./utils/util";
import Card from "./components/Card/Card";
import Searchbar from "./components/Searchbar";
import { useModal } from "./hooks/useModal";
import { Modal } from "./components/Modal";
import { useTranslation } from "react-i18next";
import { CardContainer } from "./components/Card/CardContainer";
import { debounce } from "./utils/debounce";
import ComboBox from "./components/Combobox";
import { bibleVersionOptions } from "./data/bible_version";
import { ClipboardIcon } from "@heroicons/react/solid";
import { Skeleton } from "./components/Skeleton";
import { books } from "./data/books";

const API_URL = "http://54.244.1.148:3000";

function App() {
  const { t, i18n } = useTranslation("translation");

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
    i18n.language ? bibleVersionOptions[getSystemLang(i18n.language)][0] : {}
  );

  function InitArea() {
    return (
      <div className=" w-full pl-6 pr-3 py-4 sm:py-4 bg-gray-50 rounded-md leading-5 text-gray-300 placeholder-gray-400 text-sm mt-6 text-gray-500 font-light prose prose-indigo prose-lg">
        <p> {t("search.helper.text")}:</p>
        <ul>
          <li>{t("search.helper.ex1")}</li>
          <li>{t("search.helper.ex2")}</li>
          <li>{t("search.helper.ex3")}</li>
        </ul>
      </div>
    );
  }
  function EmptyResults({ keyword }) {
    return (
      <div className="flex justify-center items-center p-4">
        <p className="text-lg font-light">
          {t("search.no_result_msg")}{" "}
          <span className="font-bold">"{keyword}"</span>
        </p>
      </div>
    );
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
      if (node) {
        observer.current.observe(node);
      }
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (hasMore && mode === "include") {
      debounce(
        loadMore(
          query,
          getSystemLang(i18n.language),
          pageNum,
          bibleVersion.value
        ),
        500
      );
    }
  }, [pageNum, i18n.language]);

  const onSearch = async () => {
    const q = objToQueryParams({
      keyword: query,
      lang: getSystemLang(i18n.language),
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
      console.log(res);
      setMode(res.mode);
      if (res.mode === "include") {
        setResults(res.bible);
        setTotal(res.count);
        if (hasMoreQuotes(pageNum, limit, res.count)) {
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

      setResults((prev) => [...prev, ...res.bible]);
      setTotal(res.count);
      if (hasMoreQuotes(page, limit, res.count)) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
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

  // Function to copy whole results
  const copyWholeResults = () => {
    if (results.length <= 0) return;

    const lang = getSystemLang(i18n.language) === "en" ? 1 : 0;
    const bookName = books[results[0].book - 1][lang];
    const chapter = results[0].chapter;
    const startVerse = results[0].verse;
    const endVerse = results[results.length - 1].verse;

    const content = results.map((row, i) => {
      return row.verse + " " + row.sentence;
    });

    let title = `${bookName} ${chapter}:${startVerse}-${endVerse}`;
    const msgToCopy = title + "\n\n" + content.join("\n");

    copyToClipboard(msgToCopy);
    open(t("modal.msg_copy"));
  };

  return (
    <>
      <div className="mt-8 min-w-[400px] min-h-[600px] flex flex-col justify-start items-center max-w-7xl mx-auto px-2 px-6 ">
        <div className="flex w-full justify-between mb-4">
          <ComboBox
            selectedOption={bibleVersion}
            setOption={setBibleVersion}
            options={bibleVersionOptions[getSystemLang(i18n.language)]}
          />
          {/* {<button onClick={() => changeLang("ko-KR")}>{"btn"}</button>} */}
          {mode === "range" && results && results.length > 0 && (
            <button
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-light leading-4 font-medium rounded-md text-white bg-gradient-to-b from-royalf to-royalt hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => copyWholeResults()}
            >
              <ClipboardIcon className="h-4 w-4 mr-2" />
              {t("search.btn_copy_all")}{" "}
            </button>
          )}
        </div>

        <div className="flex w-full justify-center space-x-6 max-w-3xl">
          <Searchbar
            ref={inputRef}
            placeholder={t("search.placeholder")}
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
          {results ? (
            !results.length && !isEntering ? (
              <EmptyResults keyword={query} />
            ) : (
              <CardContainer>
                {mode === "include" ? (
                  <div className="font-light text-lg text-center">
                    {getSystemLang(i18n.language) === "en" && "Total "}
                    <span className="font-bold ">{total}</span>{" "}
                    {t("search.result_msg")}
                  </div>
                ) : (
                  <></>
                )}
                {results.map((elem, id) => {
                  const isLastElement = results.length === id + 1;
                  return isLastElement ? (
                    <div key={id} ref={lastElementRef}>
                      <Card
                        data={elem}
                        onClick={open}
                        query={query}
                        mode={mode}
                      />
                    </div>
                  ) : (
                    <div key={id}>
                      <Card
                        data={elem}
                        onClick={open}
                        query={query}
                        mode={mode}
                      />
                    </div>
                  );
                })}
                {isLoading && (
                  <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </>
                )}
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
