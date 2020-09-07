const XLSX = require("xlsx");
const Moment = require("moment");
const fs = require("fs");
const workbook = XLSX.readFile("./conversations/test.xlsx");

const sheet_name_list = workbook.SheetNames;

let unparsed = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
let conversations = {};
for (let i = 0; i < unparsed.length; i++) {
  const current = unparsed[i];

  if (!conversations[current["Recipients"].toString()]) {
    conversations[current["Recipients"].toString()] = [
      {
        sender: current["Sender"],
        text: current["Body"],
        time: Moment(current["Date (UTC)"]),
      },
    ];
  } else {
    conversations[current["Recipients"].toString()].push({
      sender: current["Sender"],
      text: current["Body"],
      time: Moment(current["Date (UTC)"]),
    });
  }
}

fs.writeFileSync(
  "./src/conversations/student-2.json",
  JSON.stringify(conversations)
);
