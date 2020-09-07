const XLSX = require("xlsx");
const Moment = require("moment");
const fs = require("fs");
const workbook = XLSX.readFile("./conversations/test.xlsx", {
  cellDates: true,
});

const sheet_name_list = workbook.SheetNames;

let unparsed = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
let conversations = {};

for (let i = 0; i < unparsed.length; i++) {
  const current = unparsed[i];

  if (
    !conversations[
      [current["Sender"], ...current["Recipients"].toString().split(", ")]
        .sort()
        .join()
    ]
  ) {
    conversations[
      [current["Sender"], ...current["Recipients"].toString().split(", ")]
        .sort()
        .join()
    ] = {
      members: [
        current["Sender"],
        ...current["Recipients"].toString().split(", "),
      ].sort(),
      messages: [
        {
          sender: current["Sender"],
          text: current["Body"],
          time: Moment(current["Date (UTC)"]),
        },
      ],
    };
  } else {
    conversations[
      [current["Sender"], ...current["Recipients"].toString().split(", ")]
        .sort()
        .join()
    ].messages.push({
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
