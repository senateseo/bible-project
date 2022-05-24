import { lang } from "./config.js";

const searchBox = document.querySelector("#search-box");
const searchInput = document.querySelector("input");
const resultBox = document.querySelector("#result");
const resultMetaContainer = document.querySelector("#result-meta-container");
const copyBtn = document.querySelector("#btn-copy");
const clearBtn = document.querySelector("#btn-clear");
const dropdownBtn = document.querySelector("#menu-button");
const dropdownVersion = document.querySelector("#dropdown-version");
const dropdownOptionContainer = document.querySelector("#dropdown-container");

const initHelpContainer = document.querySelector("#init__text");

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

let SYSTEM_LANG = navigator.language;

/* Check Language Type */
if (SYSTEM_LANG.startsWith("ko")) {
  SYSTEM_LANG = "ko";
} else if (SYSTEM_LANG.startsWith("en")) {
  SYSTEM_LANG = "en";
}
let currentBibleVersion = bibleOptions[lang[SYSTEM_LANG]][0];
let isDropdownClicked = false;
/* i18n Multi-Langugae Supports */
i18next.init({
  lng: lang[SYSTEM_LANG],
  debug: true,
  resources: {
    ko: {
      translation: {
        helpMsg: "아래와 같이 검색하실 수 있습니다.",
        searchPlaceholder: "찾으실 성경 구절을 입력하세요 (ex 마 1:1-10)",
        example: `<p>예시:</p>
        <p>- 창세기 1:10</p>
        <p>- 창 1:10-20</p>
        <p>- 창 1:10~20</p>`,
        noResultMsg: "찾으시는 결과가 없습니다",
        copyLabel: "복사",
        copiedLabel: "복사됨",
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

/* Set Help Message */
initHelpContainer.innerHTML = `
<p>${i18next.t("helpMsg")}</p>
<br/>
<p>${i18next.t("example")}</p>
`;

const noResultInnerHTML = `
<div class="w-full flex justify-center items-center my-2">
<span class="text-gray-500 text-sm">${i18next.t("noResultMsg")}</span>
</div>
`;

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
const optionsHTML = bibleOptions[lang[SYSTEM_LANG]].map((option, idx) => {
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

for (let i = 0; i < bibleOptions[lang[SYSTEM_LANG]].length; i++) {
  const qSelect = document.querySelector(`#menu-item-${i}`);

  qSelect.addEventListener("click", () =>
    onPressDropdownOption(qSelect.innerText, qSelect.getAttribute("value"))
  );
}

let isSearching = false;
copyBtn.style.opacity = 0;
const onChangeSearchInput = async (e) => {
  try {
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

    const API_URL = {
      local: "http://localhost:3000",
      prod: "http://15.165.160.72:3000",
    };
    const { book, chapter, from, to } = parseText(e.target.value);

    let res = await fetch(`${API_URL.prod}/bible`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        book: book + 1,
        chapter: parseInt(chapter),
        from: parseInt(from),
        to: parseInt(to),
        version: lang[SYSTEM_LANG] === "en" ? 1 : 0,
      }),
    });

    const result = await res.json();
    isSearching = false;
    let innerHTML = "";

    if (searchInput.value === "") {
      innerHTML = "";
      resultBox.innerHTML = innerHTML;
      return;
    }

    if (!result.bible.length) {
      innerHTML = noResultInnerHTML;
    } else {
      turnToNotCopied();

      const totalLength = result.bible.length;
      const info = result.bible[0];

      // Render Result
      result.bible.forEach((row, idx) => {
        innerHTML += `
          <div id="phrase" class="flex my-2 text-gray-600">
            <span class="mr-2" >${row.verse}</span>
            <div>
              ${row.sentence}
            </div>
          </div>
          `;
      });

      // Render Result meta

      resultMetaContainer.innerHTML = `
      <div id="result-meta" class="text-sm text-black font-bold">
        ${info.long_label} ${info.chapter}:${
        totalLength == 1
          ? `${info.verse}`
          : `${info.verse}-${info.verse + totalLength - 1} `
      }
      </div>
      `;
      // Render Copy button
      copyBtn.style.opacity = 100;
    }

    resultBox.innerHTML = innerHTML;
    resultBox.style.opacity = 100;
  } catch (e) {
    isSearching = false;
    resultBox.innerHTML = noResultInnerHTML;
  }
};

const isMacintosh = () => {
  return navigator.platform.indexOf("Mac") > -1;
};

const isWindows = () => {
  return navigator.platform.indexOf("Win") > -1;
};

let isValid = false;

/* Parse Search Keyword */
const parseText = (text) => {
  const REGEX_BOOK = {
    en: /[a-zA-Z]+/g,
    ko: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/,
  };

  /* Parse Book */
  let parsedBook = text.match(REGEX_BOOK[lang[SYSTEM_LANG]]);
  let book = parsedBook[0];
  book = getBookIndex(book.trim(), lang[SYSTEM_LANG]);

  /* Parse Chapter */
  let parsedChapter = text.match(/[0-9]+(:|[가-힣])+[0-9-~0-9]+/g);
  let chapter = parsedChapter[0].split(":")[0];
  chapter = chapter.trim();
  console.log(parsedChapter);

  let from;
  let to;
  let parsedFromTo = parsedChapter[0].split(/[가-힣]|:/)[1].split(/[-~]/);
  console.log(parsedFromTo);
  if (parsedFromTo.length <= 1) {
    from = parsedFromTo[0];
  } else {
    from = parsedFromTo[0];
    to = parsedFromTo[1];
  }

  return {
    book,
    chapter,
    from,
    to,
  };
};

const onPressClearSearchInput = (e) => {
  e.preventDefault();

  searchInput.value = "";
  searchInput.focus();
};
let isOn = false;

const onExtension = () => {
  isOn = true;

  searchBox.classList.remove("opacity-0");
  searchBox.classList.add("opacity-100");
};

const offExtension = () => {
  isOn = false;
  searchBox.classList.remove("opacity-100");
  searchBox.classList.add("opacity-0");
};

const onPressCopyWholeText = (e) => {
  e.preventDefault();

  const resultMeta = document.querySelector("#result-meta");
  const phrases = document.querySelectorAll("#phrase");

  let finalText = `[말씀] : ${resultMeta.innerText}\n\n`;
  phrases.forEach((phrase) => {
    finalText += phrase.innerText + "\n";
  });

  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = finalText;
  // tempTextarea.style.display = "none";
  document.body.appendChild(tempTextarea);

  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 9999);

  document.execCommand("copy");
  document.body.removeChild(tempTextarea);

  // Button Style Change
  turnToCopied();
};

const turnToCopied = () => {
  copyBtn.classList.remove("bg-indigo-600");
  copyBtn.classList.remove("hover:bg-indigo-700");
  copyBtn.classList.remove("focus:ring-indigo-500");
  copyBtn.classList.remove("transition");
  copyBtn.classList.remove("ease-in-out");
  copyBtn.classList.remove("hover:scale-110");

  copyBtn.classList.add("bg-green-600");
  copyBtn.classList.add("hover:bg-green-700");
  copyBtn.classList.add("focus:ring-green-500");

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
  copyBtn.classList.remove("bg-green-600");
  copyBtn.classList.remove("hover:bg-green-700");
  copyBtn.classList.remove("focus:ring-green-500");

  copyBtn.classList.add("bg-indigo-600");
  copyBtn.classList.add("hover:bg-indigo-700");
  copyBtn.classList.add("focus:ring-indigo-500");
  copyBtn.classList.add("transition");
  copyBtn.classList.add("ease-in-out");
  copyBtn.classList.add("hover:scale-110");

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

const onKeydown = (e) => {
  let key;
  let isShift;
  let isCtrl;

  if (window.event) {
    key = window.event.keyCode;
    isShift = !!window.event.shiftKey;
    isCtrl = !!window.event.ctrlKey;
  } else {
    key = e.which;
    isShift = !!e.shiftKey;
    isCtrl = !!e.ctrlKey;
  }

  if (isShift && isCtrl) {
    switch (key) {
      case 16: // ignore shift key
        break;
      // Ctrl + Shift + S : Turn on
      case 83:
        onExtension();
        break;
      // Ctrl + Shift + E : Turn off
      case 69:
        offExtension();
        break;
      default:
        console.log(key);
        //do stuff here
        break;
    }
  }
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

searchInput.addEventListener("keyup", debounce(onChangeSearchInput, 300));
clearBtn.addEventListener("click", onPressClearSearchInput);
copyBtn.addEventListener("click", onPressCopyWholeText);
dropdownBtn.addEventListener("click", onPressDropdownBtn);

window.addEventListener("keydown", onKeydown);
