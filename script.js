const searchBox = document.querySelector("#search-box");
const searchInput = document.querySelector("input");
const resultBox = document.querySelector("#result");

const onChangeSearchInput = async (e) => {
  const { book, chapter, from, to } = parseText(e.target.value);

  let res = await fetch("http://localhost:3000/bible", {
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

  let innerHTML = "";

  if (!result.bible.length) {
    innerHTML = "찾으시는 결과가 없습니다";
  } else {
    result.bible.forEach((row, idx) => {
      innerHTML += `
        <div class="flex my-2">
          <span class="mr-2" >${row.paragraph}</span>
          <div>
            ${row.sentence}
          </div>
        </div>
        `;
    });
  }

  resultBox.innerHTML = innerHTML;
};

searchInput.addEventListener("input", onChangeSearchInput);

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

let isOn = false;

const onExtension = () => {
  isOn = true;
  searchBox.style.display = "block";
};

const offExtension = () => {
  isOn = false;
  searchBox.style.display = "none";
};

const toggleExtension = () => {
  isOn = !isOn;
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

window.addEventListener("keydown", onKeydown);
