const fs = require("fs");

let hangeul = fs.readFileSync("./teel.py", {
  encoding: "utf8",
  flag: "r",
});
let hangeulRows = hangeul.split("\n");

let cnt = 0;
hangeulRows.forEach((row, idx) => {
  let r = row.slice(0, row.length - 1);
  r = r.replace(/[()]/g, "");

  let rArr = r.split(",");

  let book = parseInt(rArr[0].replace(/\'/g, ""));
  let chapter = parseInt(rArr[1].replace(/\'/g, ""));
  let verse = parseInt(rArr[2].replace(/\'/g, ""));
  let text;
  if (rArr.length != 4) {
    text = rArr.slice(3).join(",");
  } else {
    text = rArr[3];
  }

  let prefix = "UPDATE t_kr ";
  let set = `SET v_hangeul =${text} `;
  let where = `WHERE book=${book} and chapter=${chapter} and verse=${verse}`;

  let query = prefix + set + where + ";\n";

  /* Write */
  fs.writeFile("final.txt", query, { flag: "a+" }, (err) => {
    if (err) throw err;
  });
});
