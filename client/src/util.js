/* Check Language Type */
import { lang } from "./config.js";

export const bookNames = {
  0: ["창세기", "Genesis"],
  1: ["출애굽기", "Exodus"],
  2: ["레위기", "Leviticus"],
  3: ["민수기", "Numbers"],
  4: ["신명기", "Deuteronomy"],
  5: ["여호수아", "Joshua"],
  6: ["사사기", "Judges"],
  7: ["룻기", "Ruth"],
  8: ["사무엘상", "1 Samuel"],
  9: ["사무엘하", "2 Samuel"],
  10: ["열왕기상", "1 Kings"],
  11: ["열왕기하", "2 Kings"],
  12: ["역대상", "1 Chronicles"],
  13: ["역대하", "2 Chronicles"],
  14: ["에스라", "Ezra"],
  15: ["느헤미야", "Nehemiah"],
  16: ["에스더", "Esther"],
  17: ["욥기", "Job"],
  18: ["시편", "Psalms"],
  19: ["잠언", "Proverbs"],
  20: ["전도서", "Ecclesiastes"],
  21: ["아가", "Song of Songs"],
  22: ["이사야", "Isaiah"],
  23: ["예레미야", "Jeremiah"],
  24: ["예레미야애가", "Lamentations"],
  25: ["에스겔", "Ezekiel"],
  26: ["다니엘", "Daniel"],
  27: ["호세아", "Hosea"],
  28: ["요엘", "Joel"],
  29: ["아모스", "Amos"],
  30: ["오바댜", "Obadiah"],
  31: ["요나", "Jonah"],
  32: ["미가", "Micah"],
  33: ["나훔", "Nahum"],
  34: ["하박국", "Habakkuk"],
  35: ["스바냐", "Zephaniah"],
  36: ["학개", "Haggai"],
  37: ["스가랴", "Zechariah"],
  38: ["말라기", "Malachi"],
  39: ["마태복음", "Matthew"],
  40: ["마가복음", "Mark"],
  41: ["누가복음", "Luke"],
  42: ["요한복음", "John"],
  43: ["사도행전", "Acts"],
  44: ["로마서", "Romans"],
  45: ["고린도전서", "1 Corinthians"],
  46: ["고린도후서", "2 Corinthians"],
  47: ["갈라디아서", "Galatians"],
  48: ["에베소서", "Ephesians"],
  49: ["빌립보서", "Philippians"],
  50: ["골로새서", "Colossians"],
  51: ["데살로니가전서", "1 Thessalonians"],
  52: ["데살로니가후서", "2 Thessalonians"],
  53: ["디모데전서", "1 Timothy"],
  54: ["디모데후서", "2 Timothy"],
  55: ["디도서", "Titus"],
  56: ["빌레몬서", "Philemon"],
  57: ["히브리서", "Hebrews"],
  58: ["야고보서", "James"],
  59: ["베드로전서", "1 Peter"],
  60: ["베드로후서", "2 Peter"],
  61: ["요한일서", "1 John"],
  62: ["요한이서", "2 John"],
  63: ["요한삼서", "3 John"],
  64: ["유다서", "Jude"],
  65: ["요한계시록", "Revelation"],
};

export const getSystemLang = (language = "ko") => {
  if (language.startsWith("ko")) {
    language = "ko";
  } else if (language.startsWith("en")) {
    language = "en";
  } else return undefined;
  return lang[language];
};

export const copyToClipboard = (text) => {
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = text;
  // tempTextarea.style.display = "none";
  document.body.appendChild(tempTextarea);

  tempTextarea.select();
  tempTextarea.setSelectionRange(0, 9999);

  document.execCommand("copy");
  document.body.removeChild(tempTextarea);
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
