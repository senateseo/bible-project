const { parseText, getBookIndex } = require("./bible");

test("getBookIndex good case", () => {
  // Korean
  expect(getBookIndex("마", "ko")).toEqual(39);

  expect(getBookIndex("창", "ko")).toEqual(0);

  // English
  expect(getBookIndex("gen", "en")).toEqual(0);

  expect(getBookIndex("1ch", "en")).toEqual(12);
});

test("getBookIndex wrong langugae case", () => {
  // Korean
  expect(getBookIndex("마", "en")).toEqual(-1);

  expect(getBookIndex("창", "en")).toEqual(-1);

  // English
  expect(getBookIndex("gen", "ko")).toEqual(-1);

  expect(getBookIndex("1ch", "ko")).toEqual(-1);
});

test("parseText good case", () => {
  // Korean
  expect(parseText("마", "ko")).toEqual({
    text: "마",
    version: "ko",
  });

  expect(parseText("마1:1", "ko")).toEqual({
    book: 39,
    chapter: "1",
    from: "1",
    to: undefined,
  });

  expect(parseText("dan1:1", "en")).toEqual({
    book: 26,
    chapter: "1",
    from: "1",
    to: undefined,
  });

  expect(parseText("daniel", "en")).toEqual({
    text: "daniel",
    version: "en",
  });
});
