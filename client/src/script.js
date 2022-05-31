import { bookNames, copyToClipboard, getSystemLang } from "./util.js";

const searchBox = document.querySelector("#search-box");
const searchInput = document.querySelector("input");
const resultBox = document.querySelector("#result");
const resultMetaContainer = document.querySelector("#result-meta-container");
const clearBtn = document.querySelector("#btn-clear");
const dropdownBtn = document.querySelector("#menu-button");
const dropdownVersion = document.querySelector("#dropdown-version");
const dropdownOptionContainer = document.querySelector("#dropdown-container");
const initHelpContainer = document.querySelector("#init__text");
const alertModal = document.querySelector("#modal");
let copyBtn = document.querySelector("#btn-copy");

const bibleOptions = {
  ko: [
    {
      label: "개역개정 한글",
      value: 0,
      isDefault: true,
    },
  ],
  en: [
    {
      label: "KJV (King James Version)",
      value: 1,
      isDefault: false,
    },
  ],
};

/* API URL */
const API_URL = {
  local: "http://localhost:3000",
  prod: "http://15.165.160.72:3000",
};

let SYSTEM_LANG = navigator.language;

let systemLang = getSystemLang(SYSTEM_LANG);

/* Language Error */
if (!systemLang) {
  alert(
    `지원하지 않는 언어입니다 (This language is not supported) : ${navigator.language} \n
     Settings > Language 에서 언어를 설정해주세요. (Check your language settings)
    `
  );
}

let currentBibleVersion = bibleOptions[systemLang][0];
let isDropdownClicked = false;
/* i18n Multi-Langugae Supports */
i18next.init({
  lng: systemLang,
  debug: true,
  resources: {
    ko: {
      translation: {
        helpMsg: "아래와 같이 검색하실 수 있습니다.",
        searchPlaceholder: "키워드를 입력하세요 (ex 마 1:1-10 혹은 '성령')",
        example: `<p>예시:</p>
        <p>- 창세기 1:10</p>
        <p>- 창 1:10-20</p>
        <p>- 창 1:10~20</p>`,
        noResultMsg: "찾으시는 결과가 없습니다",
        copyLabel: "복사",
        copiedLabel: "복사됨",
        searchResult: "검색결과",
        copiedMessage: "클립보드에 복사되었습니다.",
        total: "총",
        counts: "건",
      },
    },
    en: {
      translation: {
        helpMsg: "You can search the bible in this way: ",
        searchPlaceholder: "Enter Search Keyword. (ex: Gen 1:10)",
        example: `<p>Ex:</p>
        <p>- Genesis 1:10</p>
        <p>- Gen 1:10-20</p>
        <p>- Gen 1:10~20</p>`,
        noResultMsg: "No results",
        copyLabel: "Copy",
        copiedLabel: "Copied",
        searchResult: "Result",
        copiedMessage: "Copied in clipboard",
        total: "Total",
        counts: "results",
      },
    },
  },
});

/* Set init dropdown option */
dropdownBtn.innerHTML = `${currentBibleVersion["label"]} <svg
  class="-mr-1 ml-2 h-5 w-5"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
  aria-hidden="true"
>
  <path
    fill-rule="evenodd"
    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    clip-rule="evenodd"
  />
</svg>`;

/* Set Searchbar placeholder */
searchInput.placeholder = i18next.t("searchPlaceholder");

const noResultInnerHTML = `
<div class="w-full flex justify-center items-center my-2">
<span class="text-gray-500 text-sm">${i18next.t("noResultMsg")}</span>
</div>
`;

const initResultInnerHTML = `
<div id="init__text" class="flex flex-col text-gray-500">
<p>${i18next.t("helpMsg")}</p>
<br/>
<p>${i18next.t("example")}</p>
</div>
`;

/* Set Help Message */
resultBox.innerHTML = initResultInnerHTML;

const onPressDropdownOption = (label, value) => {
  if (!isDropdownClicked) return;
  // set option
  currentBibleVersion = value;
  // change button text
  dropdownBtn.innerHTML = `${label}  <svg
  class="-mr-1 ml-2 h-5 w-5"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="currentColor"
  aria-hidden="true"
>
  <path
    fill-rule="evenodd"
    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
    clip-rule="evenodd"
  />
</svg>`;
  // close dropdown
  onCloseDropdownOption();
};

/* Set Dropdown Options Init */
const optionsHTML = bibleOptions[systemLang].map((option, idx) => {
  return `
  <a
  class="text-gray-700 block px-4 py-2 text-xs cursor-pointer"
  role="menuitem"
  value=${option.value}
  id="menu-item-${idx}"
  >${option.label}
  </a>
  `;
});

dropdownOptionContainer.innerHTML = optionsHTML.join().replace(/,/g, "");

for (let i = 0; i < bibleOptions[systemLang].length; i++) {
  const qSelect = document.querySelector(`#menu-item-${i}`);

  qSelect.addEventListener("click", () =>
    onPressDropdownOption(qSelect.innerText, qSelect.getAttribute("value"))
  );
}

/* Pagination Control Variables */
let curPage = 1;
const limit = 20;
let total = 0;

let searchKeyword = "";
let langIdx = systemLang === "ko" ? 0 : 1;
let searchMode;

let isSearching = false;
copyBtn.style.opacity = 0;
const onChangeSearchInput = async (e) => {
  if (e.target.value === "") {
    /* Set Help Message */
    setInitResult();
    return;
  }

  try {
    if (e.target.value.length < 2) return;
    searchKeyword = e.target.value;
    isSearching = true;
    if (isSearching) {
      resultBox.innerHTML = `
      <div class="animate-pulse flex flex-col space-y-4">
      <div class="h-2 bg-gray-100 rounded"></div>
      <div class="h-2 bg-gray-100 rounded"></div>
      <div class="h-2 bg-gray-100 rounded"></div>
      <div class="h-2 bg-gray-100 rounded"></div>
      <div class="h-2 bg-gray-100 rounded"></div>
      <div class="h-2 bg-gray-100 rounded"></div>
      <div class="h-2 bg-gray-100 rounded"></div>
      <div class="h-2 bg-gray-100 rounded"></div>
      </div>
      `;
    }

    let params = {
      keyword: searchKeyword,
      lang: systemLang,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let res = await fetch(`${API_URL.prod}/bible?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    const result = await res.json();

    //If it returns empty object
    if (Object.keys(result).length === 0) {
      setNoResult();
      return;
    }
    isSearching = false;
    let totalLength;
    let innerHTML = "";
    searchMode = result.mode;

    switch (searchMode) {
      case "range":
        totalLength = result.bible.length;
        const info = result.bible[0];

        if (!totalLength) {
          setNoResult();
        } else {
          // If the mode is search range
          result.bible.forEach((row, idx) => {
            innerHTML += `
                <div id="phrase" class="flex items-start">
                  <span class="mr-2 text-xs" >${row.verse}</span>
                  <div class="text-xs">
                    ${row.sentence}
                  </div>
                </div>
                `;
          });

          resultBox.innerHTML = innerHTML;

          //Render Result meta
          resultMetaContainer.innerHTML = `
          <div class="flex justify-center items-center">
              <div id="result-meta" class="text-sm text-black py-2">
              ${i18next.t("searchResult")} : <span class="font-bold">${
            bookNames[info.book - 1][langIdx]
          } ${info.chapter}:${
            totalLength == 1
              ? `${info.verse}`
              : `${info.verse}-${info.verse + totalLength - 1} `
          }
            </span>
           
              </div>
             
            </div>
              <button
              id="btn-copy"
              type="button"
              class="transition ease-in-out hover:scale-110 text-xs inline-flex items-center px-2 py-1 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 opacity-100"
            >hi</button>
            `;
          copyBtn = document.querySelector("#btn-copy");
          turnToNotCopied();
          //Render Copy button
          copyBtn.style.opacity = 100;
        }

        break;

      case "include":
        totalLength = result.bible.count;

        if (!totalLength) {
          setNoResult();
        } else {
          // If the mode is search including keyword
          // clear result container
          resultBox.innerHTML = "";
          result.bible.rows.forEach((row, idx) => {
            let id = `include-item-${idx}`;
            let verseTitle = `${bookNames[row.book - 1][langIdx]} ${
              row.chapter
            }:${row.verse}`;

            let item = document.createElement("div");
            item.id = id;
            item.className =
              "transition ease-in-out flex flex-col space-y-2 border border-gray-200 rounded-md p-4 cursor-pointer hover:border-indigo-500";
            item.innerHTML = `
            <div class="text-sm text-indigo-600"> ${verseTitle}</div>
            <div class="text-xs">
              ${row.sentence}
            </div>
            `;
            let textToCopy = `[${verseTitle}] \n${row.sentence}`;

            item.addEventListener("click", () => {
              const targetModal = document.querySelector("#modal__text");
              targetModal.textContent = i18next.t("copiedMessage");

              copyToClipboard(textToCopy);
              onOpenModal();
            });
            resultBox.appendChild(item);
          });

          //Render Result meta
          resultMetaContainer.innerHTML = `
          <div
          class="flex justify-center items-center"
        >
           <div id="result-meta" class="text-sm  py-2">
           ${i18next.t("searchResult")} : ${i18next.t(
            "total"
          )} <span class="font-bold">${totalLength}</span> ${i18next.t(
            "counts"
          )}
           </div>
           </div>
           
         `;

          copyBtn.style.opacity = 0;
        }

        break;
      default:
        break;
    }

    resultBox.style.opacity = 100;
  } catch (e) {
    isSearching = false;
    resultBox.innerHTML = noResultInnerHTML;
  }
};

const setInitResult = () => {
  resultBox.innerHTML = initResultInnerHTML;
  resultMetaContainer.innerHTML = "";
  return;
};

const setNoResult = () => {
  /* Set Result box to empty */
  resultBox.innerHTML = noResultInnerHTML;
};

const onPressClearSearchInput = (e) => {
  e.preventDefault();

  searchInput.value = "";
  searchInput.focus();
};

const onPressCopyWholeText = (e) => {
  e.preventDefault();

  const resultMeta = document.querySelector("#result-meta");
  const phrases = document.querySelectorAll("#phrase");

  const copyTextTitle = resultMeta.innerText.split(":").slice(1).join(":");

  let finalText = `[${copyTextTitle}]\n\n`;
  phrases.forEach((phrase) => {
    let spaceRemovedText = phrase.innerText.split("\n").join("  ");
    finalText += spaceRemovedText + "\n";
  });

  // copy to clipboard
  copyToClipboard(finalText);

  // Button Style Change
  turnToCopied();
};

const turnToCopied = () => {
  copyBtn.classList.remove(
    "bg-indigo-600",
    "hover:bg-indigo-700",
    "focus:ring-indigo-500",
    "transition",
    "ease-in-out",
    "hover:scale-110"
  );

  copyBtn.classList.add(
    "bg-green-600",
    "hover:bg-green-700",
    "focus:ring-green-500"
  );

  copyBtn.innerHTML = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-4 w-4 mr-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
  />
</svg>
${i18next.t("copiedLabel")}
  `;

  copyBtn.removeEventListener("click", onPressCopyWholeText);
};

const turnToNotCopied = () => {
  copyBtn.classList.remove(
    "bg-green-600",
    "hover:bg-green-700",
    "focus:ring-green-500"
  );

  copyBtn.classList.add(
    "bg-indigo-600",
    "hover:bg-indigo-700",
    "focus:ring-indigo-500",
    "transition",
    "ease-in-out",
    "hover:scale-110"
  );

  copyBtn.innerHTML = `
  <svg
  xmlns="http://www.w3.org/2000/svg"
  class="h-4 w-4 mr-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
  stroke-width="2"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
  />
</svg>
${i18next.t("copyLabel")}
  `;

  copyBtn.addEventListener("click", onPressCopyWholeText);
};

const onOpenDropdownOption = () => {
  isDropdownClicked = true;
  dropdownVersion.classList.remove(
    "transform",
    "disabled:opacity-0",
    "scale-95"
  );
  dropdownVersion.classList.add(
    "transform",
    "opacity-100",
    "scale-100",
    "z-10"
  );
};

const onCloseDropdownOption = () => {
  isDropdownClicked = false;

  dropdownVersion.classList.remove(
    "transform",
    "opacity-100",
    "scale-100",
    "z-10"
  );
  dropdownVersion.classList.add("transform", "disabled:opacity-0", "scale-95");
};

const onPressDropdownBtn = (e) => {
  e.preventDefault();

  if (isDropdownClicked) {
    onCloseDropdownOption();
  } else {
    onOpenDropdownOption();
  }
};

const onOpenModal = (e) => {
  alertModal.classList.remove("opacity-0");
  alertModal.classList.add("opacity-100");

  setTimeout(() => {
    onCloseModal();
  }, 3000);
};

const onCloseModal = (e) => {
  alertModal.classList.add("opacity-0");
  alertModal.classList.remove("opacity-100");
};

searchInput.addEventListener("keyup", debounce(onChangeSearchInput, 300));
clearBtn.addEventListener("click", onPressClearSearchInput);
copyBtn.addEventListener("click", onPressCopyWholeText);
dropdownBtn.addEventListener("click", onPressDropdownBtn);

const hasMoreQuotes = (page, limit, total) => {
  const startIndex = (page - 1) * limit + 1;
  return total === 0 || startIndex < total;
};

const loadMore = (q, page, limit) => {
  // TODO : Show loader

  setTimeout(async () => {
    try {
      let params = {
        keyword: q,
        lang: systemLang,
        page,
      };

      let query = Object.keys(params)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
        .join("&");

      if (hasMoreQuotes(page, limit, total)) {
        // call the API to get quotes
        let res = await fetch(`${API_URL.prod}/bible?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
        });

        const result = await res.json();

        // Append to list
        result.bible.rows.forEach((row, idx) => {
          let id = `include-item-${idx}`;
          let verseTitle = `${bookNames[row.book - 1][langIdx]} ${
            row.chapter
          }:${row.verse}`;

          let item = document.createElement("div");
          item.id = id;
          item.className =
            "transition ease-in-out flex flex-col space-y-2 border border-gray-200 rounded-md p-4 cursor-pointer hover:border-indigo-500";
          item.innerHTML = `
          <div class="text-sm text-indigo-600"> ${verseTitle}</div>
          <div class="text-xs">
            ${row.sentence}
          </div>
          `;
          let textToCopy = `[${verseTitle}] \n${row.sentence}`;

          item.addEventListener("click", () => {
            const targetModal = document.querySelector("#modal__text");
            targetModal.textContent = i18next.t("copiedMessage");

            copyToClipboard(textToCopy);
            onOpenModal();
          });
          resultBox.appendChild(item);
        });

        total = result.bible.count;
      }
    } catch (e) {
      console.log(e);
    } finally {
      // TODO : Hide loader
    }
  }, 500);
};
// listen for scroll event and load more images if we reach the bottom of window
resultBox.addEventListener("scroll", () => {
  if (!searchMode || searchMode === "range") return;

  const { scrollTop, scrollHeight, clientHeight } = resultBox;

  if (
    scrollTop + clientHeight >= scrollHeight - 5 &&
    hasMoreQuotes(curPage, limit, total)
  ) {
    curPage++;
    loadMore(searchKeyword, curPage, limit);
    // alert("fetch");
  }
});
