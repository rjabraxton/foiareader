const XLSX = require("xlsx");
const Moment = require("moment");
const path = require("path");
const directoryPath = path.join(__dirname, "");
const fs = require("fs");
const mkdirp = require("mkdirp");
const getDirName = require("path").dirname;

let contactsJson = require("../../src/conversations/contacts.json");

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    //Only mess with .xlsx files
    if (file.match(/^.*\.(xlsx)$/)) {
      const workbook = XLSX.readFile(`./recordsFiles/textMessages/${file}`, {
        cellDates: true,
      });
      const sheet_name_list = workbook.SheetNames;

      let newTally = contactsJson.tally;

      let unparsed = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheet_name_list[0]]
      );
      let conversations = {};

      // For each unparsed conversation
      for (let i = 0; i < unparsed.length; i++) {
        const current = unparsed[i];

        // In this block we check if the number is listed as a Contact.
        if (!Number.isInteger(current["Recipients"])) {
          //if it's an array of strings, make it an array of ints
          current["Recipients"] = current["Recipients"].split(",");
          // eslint-disable-next-line no-loop-func
          current["Recipients"] = current["Recipients"].map((curr) => {
            // This handles updating contacts
            if (!Object.keys(contactsJson.contacts).includes(curr.trim())) {
              newTally++;
              contactsJson.contacts[parseInt(curr)] = {
                abbr: newTally.toString(),
                role: "Unknown",
                name: `Unknown Person #${newTally}`,
                number: parseInt(curr),
              };
            }
            // Convert numbers to int
            return parseInt(curr);
          });
        } else {
          //this handles updating contacts
          if (
            !Object.keys(contactsJson.contacts).includes(
              current["Recipients"].toString()
            )
          ) {
            newTally++;
            contactsJson.contacts[current["Recipients"]] = {
              abbr: newTally.toString(),
              role: "Unknown",
              name: `Unknown Person #${newTally}`,
              number: current["Recipients"],
            };
          }

          //if it's a number, put it into an array
          current["Recipients"] = [current["Recipients"]];
        }

        contactsJson.tally = newTally;

        fs.writeFileSync(
          "./src/conversations/contacts.json",
          JSON.stringify(contactsJson)
        );
        // END Contacts List work

        const createRecord = (line, msgArray) => {
          if (line["AttachmentCount"]) {
            // This message has images....
            msgArray.push({
              sender: line["Sender"],
              text: line["MessageId"].toString(),
              time: Moment(line["Date (UTC)"]),
              isImage: true,
            });
            msgArray.push({
              sender: line["Sender"],
              text: line["Body"],
              time: Moment(line["Date (UTC)"]),
            });
          } else {
            // This message does not have images
            msgArray.push({
              sender: line["Sender"],
              text: line["Body"],
              time: Moment(line["Date (UTC)"]),
            });
          }
        };

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
            createRecord(current, mostRecentBlock);
          } else {
            //Last text was not sent by this person
            conversations[members].messages.push([]);
            const lastBlock =
              conversations[members].messages[
                conversations[members].messages.length - 1
              ];
            createRecord(current, lastBlock);
          }
        }
      }

      const path = `./src/conversations/${file.replace(
        /[^A-Z0-9]/gi,
        "_"
      )}/messages.json`;
      mkdirp(getDirName(path), function (err) {
        if (err) return;

        fs.writeFile(path, JSON.stringify(conversations), () => {});
      });
    }
  });
});
