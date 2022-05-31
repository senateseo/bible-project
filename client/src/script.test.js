import { getBookIndex } from "../../server/utils/prefix";
import { getSystemLang } from "./util";

test("Returns lang type for the input", () => {
  const expects = ["ko-KR", "en-US", "ko", "en", "nn"];
  const tobes = ["ko", "en", "ko", "en", undefined];

  expects.forEach((expectValue, idx) => {
    expect(getSystemLang(expectValue)).toBe(tobes[idx]);
    return;
  });
});

test("Returns book index for the input", () => {
  const expects = ["gen", "hello"];
  const tobes = [0, -1];

  expects.forEach((expectValue, idx) => {
    expect(getBookIndex(expectValue, "en")).toBe(tobes[idx]);
    return;
  });
});
