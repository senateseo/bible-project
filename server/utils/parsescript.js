const fs = require("fs");
const { formatWithOptions } = require("util");

fs.readFile("./books.csv", "utf-8", (err, data) => {
  if (err) console.log(err);

  let emptyObj = {};
  let dataArr = data.split("\n");
  dataArr.forEach((row, idx) => {
    let rowArr = row.split(",");

    let key = rowArr[0];
    let value = [];
    value.push(rowArr[3].substr(1, rowArr[3].length - 2));
    value.push(rowArr[5].substr(1, rowArr[5].length - 2));

    emptyObj[parseInt(key)] = value;
  });

  fs.writeFile("output.json", JSON.stringify(emptyObj), "utf8", (err) => {
    if (err) {
      console.log("error occured");
      return console.log(err);
    }
  });

  console.log("JSON file has been saved");
});
