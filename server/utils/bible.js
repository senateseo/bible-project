const bookPrefix = {
  0: {
    ko: ["창", "창세기"],
    en: ["Gen", "Ge", "Gn", "Genesis"],
  },
  1: {
    ko: ["출", "출애굽기"],
    en: ["Ex", "Exod", "Exo", "Exodus"],
  },
  2: {
    ko: ["레", "레위기"],
    en: ["Lev", "Le", "Lv"],
  },
  3: {
    ko: ["민", "민수기"],
    en: ["Num", "Nu", "Nm", "Nb"],
  },
  4: {
    ko: ["신", "신명기"],
    en: ["Deut", "De", "Dt", "Deuteronomy"],
  },
  5: {
    ko: ["수", "여호수아"],
    en: ["Josh", "Jos", "Jsh", "Joshua"],
  },
  6: {
    ko: ["삿", "사사기"],
    en: ["Judg", "Jdg", "Jg", "Jdgs", "Judges"],
  },
  7: {
    ko: ["룻", "룻기"],
    en: ["Ruth", "Rth", "Ru"],
  },
  8: {
    ko: ["삼상", "사무엘상"],
    en: [
      "1 Sam",
      "1 Sm",
      "1 Sa",
      "I S",
      "I Sam",
      "I Sa",
      "1Sam",
      "1Sa",
      "1S",
      "1st Samuel",
      "1st Sam",
      "First Samuel",
      "First Sam",
    ],
  },
  9: {
    ko: ["삼하", "사무엘하"],
    en: [
      "2 Sam",
      "2 Sm",
      "2 Sa",
      "II S",
      "II Sam",
      "II Sa",
      "2Sam",
      "2Sa",
      "2S",
      "2nd Samuel",
      "2nd Sam",
      "Second Samuel",
      "Second Sam",
    ],
  },
  10: {
    ko: ["왕상", "열왕기상"],
    en: [
      "1 Kgs",
      "1 Ki",
      "1Kgs",
      "1Kin",
      "1Ki",
      "1K",
      "I Kgs",
      "I Ki",
      "1st Kings",
      "1st Kgs",
      "First Kings",
      "First Kgs",
    ],
  },
  11: {
    ko: ["왕하", "열왕기하"],
    en: [
      "2 Kings",
      "2 Kgs",
      "2 Ki",
      "2Kgs",
      "2Kin",
      "2Ki",
      "2K",
      "II Kgs",
      "II Ki",
      "2nd Kings",
      "2nd Kgs",
      "Second Kings",
      "Second Kgs",
    ],
  },
  12: {
    ko: ["대상", "역대상"],
    en: [
      "1 Chron",
      "1 Chr",
      "1 Ch",
      "1Chron",
      "1Chr",
      "1Ch",
      "I Chron",
      "I Chr",
      "I Ch",
      "1st Chronicles",
      "1st Chron",
      "First Chronicles",
      "First Chron",
    ],
  },
  13: {
    ko: ["대하", "역대하"],
    en: [
      "2 Chron",
      "2 Chr",
      "2 Ch",
      "2Chron",
      "2Chr",
      "2Ch",
      "II Chron",
      "II Chr",
      "II Ch",
      "2nd Chronicles",
      "2nd Chron",
      "Second Chronicles",
      "Second Chron",
    ],
  },
  14: {
    ko: ["스", "에스라"],
    en: ["Ezra", "Ezr", "Ez"],
  },
  15: {
    ko: ["느", "느헤미야"],
    en: ["Nehemia", "Neh", "Ne"],
  },
  16: {
    ko: ["에", "에스더"],
    en: ["Esther", "Est", "Esth", "Es"],
  },
  17: {
    ko: ["욥", "욥기"],
    en: ["Job", "Jb"],
  },
  18: {
    ko: ["시", "시편"],
    en: ["Psalms", "Ps", "Psalm", "Pslm", "Psa", "Psm", "Pss"],
  },
  19: {
    ko: ["잠", "잠언"],
    en: ["Proverbs", "Prov", "Pro", "Prv", "Pr"],
  },
  20: {
    ko: ["전", "전도서"],
    en: ["Ecclesiastes", "Eccles", "Eccle", "Ecc", "Ec", "Qoh"],
  },
  21: {
    ko: ["아", "아가"],
    en: [
      "Song of Solomon",
      "Song",
      "Song of Songs",
      "SOS",
      "So",
      "Canticle of Canticles",
      "Canticles",
      "Cant",
    ],
  },
  22: {
    ko: ["사", "이사야"],
    en: ["Isaiah", "Isa", "Is"],
  },
  23: {
    ko: ["렘", "예레미야"],
    en: ["Jeremiah", "Jer", "Je", "Jr"],
  },
  24: {
    ko: ["애", "예레미야애가"],
    en: ["Lamentations", "Lam", "La"],
  },
  25: {
    ko: ["겔", "에스겔"],
    en: ["Ezekiel", "Ezek", "Eze", "Ezk"],
  },
  26: {
    ko: ["단", "다니엘"],
    en: ["Daniel", "Dan", "Da", "Dn"],
  },
  27: {
    ko: ["호", "호세아"],
    en: ["Hosea", "Hos", "Ho"],
  },
  28: {
    ko: ["욜", "요엘"],
    en: ["Joel", "Jl"],
  },
  29: {
    ko: ["암", "아모스"],
    en: ["Amos", "Am"],
  },
  30: {
    ko: ["옵", "오바댜"],
    en: ["Obadiah", "Obad", "Ob"],
  },
  31: {
    ko: ["욘", "요나"],
    en: ["Jonah", "Jnh", "Jon"],
  },
  32: {
    ko: ["미", "미가"],
    en: ["Micah", "Mic", "Mc"],
  },
  33: {
    ko: ["나", "나훔"],
    en: ["Nahum", "Nah", "Na"],
  },
  34: {
    ko: ["합", "하박국"],
    en: ["Habakkuk", "Hab", "Hb"],
  },
  35: {
    ko: ["습", "스바냐"],
    en: ["Zephaniah", "Zeph", "Zep", "Zp"],
  },
  36: {
    ko: ["학", "학개"],
    en: ["Haggai", "Hag", "Hg"],
  },
  37: {
    ko: ["슥", "스가랴"],
    en: ["Zechariah", "Zech", "Zec", "Zc"],
  },
  38: {
    ko: ["말", "말라기"],
    en: ["Malachi", "Mal", "Ml"],
  },
  39: {
    ko: ["마", "마태복음"],
    en: ["Matthew", "Matt", "Mt"],
  },
  40: {
    ko: ["막", "마가복음"],
    en: ["Mark", "Mrk", "Mar", "Mk", "Mr"],
  },
  41: {
    ko: ["눅", "누가복음"],
    en: ["Luke", "Luk", "Lk"],
  },
  42: {
    ko: ["요", "요한복음"],
    en: ["John", "Joh", "Jhn", "Jn"],
  },
  43: {
    ko: ["행", "사도행전"],
    en: ["Acts", "Act", "Ac"],
  },
  44: {
    ko: ["롬", "로마서"],
    en: ["Romans", "Rom", "Ro", "Rm"],
  },
  45: {
    ko: ["고전", "고린도전서"],
    en: [
      "1 Cor",
      "1 Co",
      "I Cor",
      "I Co",
      "1Cor",
      "1Co",
      "I Corinthians",
      "1Corinthians",
      "1st Corinthians",
      "First Corinthians",
    ],
  },
  46: {
    ko: ["고후", "고린도후서"],
    en: [
      "2 Cor",
      "2 Co",
      "II Cor",
      "II Co",
      "2Cor",
      "2Co",
      "II Corinthians",
      "IICorinthians",
      "2nd Corinthians",
      "Second Corinthians",
    ],
  },
  47: {
    ko: ["갈", "갈라디아서"],
    en: ["Galatians", "Gal", "Ga"],
  },
  48: {
    ko: ["엡", "에베소서"],
    en: ["Ephesians", "Eph", "Ephes"],
  },
  49: {
    ko: ["빌", "빌립보서"],
    en: ["Philippians", "Phil", "Php", "Pp"],
  },
  50: {
    ko: ["골", "골로새서"],
    en: ["Colossians", "Col", "Co"],
  },
  51: {
    ko: ["살전", "데살로니가전서"],
    en: [
      "1 Thess",
      "1 Thes",
      "1 Th",
      "I Thessalonians",
      "I Thess",
      "I Thes",
      "I Th",
      "1Thessalonians",
      "1Thess",
      "1Thes",
      "1Th",
      "1st Thessalonians",
      "1st Thess",
      "First Thessalonians",
      "First Thess",
    ],
  },
  52: {
    ko: ["살후", "데살로니가후서"],
    en: [
      "2 Thess",
      "2 Thes",
      "2 Th",
      "II Thessalonians",
      "II Thess",
      "II Thes",
      "II Th",
      "2Thessalonians",
      "2Thess",
      "2Thes",
      "2Th",
      "2nd Thessalonians",
      "2nd Thess",
      "Second Thessalonians",
      "Second Thess",
    ],
  },
  53: {
    ko: ["딤전", "디모데전서"],
    en: [
      "1 Tim",
      "1 Ti",
      "I Timothy",
      "I Tim",
      "I Ti",
      "1Timothy",
      "1Tim",
      "1Ti",
      "1st Timothy",
      "1st Tim",
      "First Timothy",
      "First Tim",
    ],
  },
  54: {
    ko: ["딤후", "디모데후서"],
    en: [
      "2 Tim",
      "2 Ti",
      "II Timothy",
      "II Tim",
      "II Ti",
      "2Timothy",
      "2Tim",
      "2Ti",
      "2nd Timothy",
      "2nd Tim",
      "Second Timothy",
      "Second Tim",
    ],
  },
  55: {
    ko: ["딛", "디도서"],
    en: ["Titus", "Tit", "ti"],
  },
  56: {
    ko: ["몬", "빌레몬서"],
    en: ["Philemon", "Philem", "Phm", "Pm"],
  },
  57: {
    ko: ["히", "히브리서"],
    en: ["Hebrews", "Heb"],
  },
  58: {
    ko: ["약", "야고보서"],
    en: ["James", "Jas", "Jm"],
  },
  59: {
    ko: ["벧전", "베드로전서"],
    en: [
      "1 Pet",
      "1 Pe",
      "1 Pt",
      "1 P",
      "I Pet",
      "I Pt",
      "I Pe",
      "1Peter",
      "1Pet",
      "1Pe",
      "1Pt",
      "1P",
      "I Peter",
      "1st Peter",
      "First Peter",
    ],
  },
  60: {
    ko: ["벧후", "베드로후서"],
    en: [
      "2 Pet",
      "2 Pe",
      "2 Pt",
      "2 P",
      "II Pet",
      "II Pt",
      "II Pe",
      "2Peter",
      "2Pet",
      "2Pe",
      "2Pt",
      "2P",
      "II Peter",
      "2nd Peter",
      "Second Peter",
    ],
  },
  61: {
    ko: ["요일", "요한일서"],
    en: [
      "1 John",
      "1 Jhn",
      "1 Jn",
      "1 J",
      "1John",
      "1Jhn",
      "1Joh",
      "1Jn",
      "1Jo",
      "1J",
      "I John",
      "I Jhn",
      "I Joh",
      "I Jn",
      "I Jo",
      "1st John",
      "First John",
    ],
  },
  62: {
    ko: ["요이", "요한이서"],
    en: [
      "2 John",
      "2 Jhn",
      "2 Jn",
      "2 J",
      "2John",
      "2Jhn",
      "2Joh",
      "2Jn",
      "2Jo",
      "2J",
      "II John",
      "II Jhn",
      "II Joh",
      "II Jn",
      "II Jo",
      "2nd John",
      "Second John",
    ],
  },
  63: {
    ko: ["요삼", "요한삼서"],
    en: [
      "3 John",
      "3 Jhn",
      "3 Jn",
      "3 J",
      "3John",
      "3Jhn",
      "3Joh",
      "3Jn",
      "3Jo",
      "3J",
      "III John",
      "III Jhn",
      "III Joh",
      "III Jn",
      "III Jo",
      "3rd John",
      "Third John",
    ],
  },
  64: {
    ko: ["유", "유다서"],
    en: ["Jude", "Jud", "Jd"],
  },
  65: {
    ko: ["계", "요한계시록"],
    en: ["Revelation", "Re", "The Revelation"],
  },
};

const REGEX_BOOK = {
  en: /[a-zA-Z]+/g,
  ko: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+/,
};

/**
 * Returns Bible book index
 *
 * @param {string} prefix The parsed book string from user input
 * @param {string} version "language"
 * @returns {number | undefined} bible book index
 */

const getBookIndex = (prefix, version) => {
  const idx = Object.values(bookPrefix).findIndex((prefixArr) => {
    if (version === "en") {
      let arrToCompare = prefixArr[version];
      let found = arrToCompare.findIndex(
        (el) => el.toLowerCase() === prefix.toLowerCase()
      );

      return found >= 0 ? true : false;
    } else return prefixArr[version].includes(prefix);
  });

  return idx;
};

/**
 * Returns parsed data
 * @param {string} text text to parse
 * @param {string} lang language string
 * @returns
 */
const parseText = (text, lang) => {
  /* Parse Book */
  let parsedBook = text.match(REGEX_BOOK[lang]);

  let book = parsedBook[0];

  book = getBookIndex(book.trim(), lang);

  // If book is not found
  if (book === -1) {
    return {
      text,
      version: lang,
    };
  } else {
    /* Parse Chapter */
    let parsedChapter = text.match(/[0-9]+(:|[가-힣])+[0-9-~0-9]+/g);
    if (!parsedChapter || !parsedChapter.length) return {};
    let chapter = parsedChapter[0].split(":")[0];
    chapter = chapter.trim();

    let from;
    let to;
    let parsedFromTo = parsedChapter[0].split(/[가-힣]|:/)[1].split(/[-~]/);

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
  }
};

module.exports = { parseText };
