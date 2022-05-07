const searchBox = document.querySelector("#search-box");
const searchInput = document.querySelector("input");
const resultBox = document.querySelector("#result");
const resultMetaContainer = document.querySelector("#result-meta-container");
const copyBtn = document.querySelector("#btn-copy");
const clearBtn = document.querySelector("#btn-clear");

const noResultInnerHTML = `
<div class="w-full flex justify-center items-center my-2">
<span class="text-gray-500 text-sm">찾으시는 결과가 없습니다</span>
</div>
`;
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
            <span class="mr-2" >${row.paragraph}</span>
            <div>
              ${row.sentence}
            </div>
          </div>
          `;
      });

      // Render Result meta

      resultMetaContainer.innerHTML = `
      <span class="text-sm text-gray-700">성경말씀 :</span>
      <div id="result-meta" class="text-sm text-black font-bold mx-2">
        ${info.long_label} ${info.chapter}장 ${
        totalLength == 1
          ? `${info.paragraph}절`
          : `${info.paragraph}-${info.paragraph + totalLength - 1} 절`
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

const parseText = (text) => {
  let parsedBook = text.split(" ");
  let book = parsedBook[0];
  book = getBookIndex(book.trim());

  let parsedChapter = parsedBook[1].split(":");
  let chapter = parsedChapter[0];
  chapter = chapter.trim();

  let from;
  let to;
  let parsedFromTo = parsedChapter[1].split(/-|~/);

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
복사됨
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
복사
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

searchInput.addEventListener("keyup", debounce(onChangeSearchInput, 300));
clearBtn.addEventListener("click", onPressClearSearchInput);
copyBtn.addEventListener("click", onPressCopyWholeText);

window.addEventListener("keydown", onKeydown);
