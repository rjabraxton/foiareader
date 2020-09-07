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
  const previous = i > 0 && unparsed[i - 1];
  const members = [
    current["Sender"],
    ...current["Recipients"].toString().split(", "),
  ]
    .sort()
    .join();

  if (!conversations[members]) {
    //if this conversation has not been seen before
    conversations[members] = {
      members: [
        current["Sender"],
        ...current["Recipients"].toString().split(", "),
      ].sort(),
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

    if (current["Sender"] == previous["Sender"]) {
      //if the last text was sent by the same person as this one
      conversations[members].messages[
        conversations[members].messages.length - 1
      ].push({
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
