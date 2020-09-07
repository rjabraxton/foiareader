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

  if (!Number.isInteger(current["Recipients"])) {
    //if it's an array of strings, make it an array of ints
    current["Recipients"] = current["Recipients"].split(",");
    current["Recipients"] = current["Recipients"].map((curr) => parseInt(curr));
  } else {
    //if it's a number, put it into an array
    current["Recipients"] = [current["Recipients"]];
  }

  const members = [current["Sender"], ...current["Recipients"]]
    .sort()
    .join()
    .trim();

  if (!conversations[members]) {
    //if this conversation has not been seen before
    conversations[members] = {
      members: [current["Sender"], ...current["Recipients"]].sort(),
      messages: [
        [
          {
            sender: current["Sender"],
            text: current["Body"],
            time: Moment(current["Date (UTC)"]),
          },
        ],
      ],
    };
  } else {
    //if this conversation has been seen before
    const mostRecentBlock =
      conversations[members].messages[
        conversations[members].messages.length - 1
      ];

    if (current["Sender"] == mostRecentBlock[0].sender) {
      //if the last text was sent by the same person as this one
      mostRecentBlock.push({
        sender: current["Sender"],
        text: current["Body"],
        time: Moment(current["Date (UTC)"]),
      });
    } else {
      //Last text was not sent by this person
      conversations[members].messages.push([
        {
          sender: current["Sender"],
          text: current["Body"],
          time: Moment(current["Date (UTC)"]),
        },
      ]);
    }
  }
}

fs.writeFileSync(
  "./src/conversations/student-2.json",
  JSON.stringify(conversations)
);
