const XLSX = require("xlsx");
const Moment = require("moment");
const path = require("path");
const directoryPath = path.join(__dirname, "");
const fs = require("fs");
const mkdirp = require("mkdirp");
const getDirName = require("path").dirname;

const fileExtensionRegex = /(?:\.([^.]+))?$/;

let contactsJson = require("../../src/conversations/contacts.json");

fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  //listing all files using forEach
  files.forEach(function (folder) {
    const sanitizedFolderName = folder.replace(/[^A-Z0-9]/gi, "_");

    fs.readdir(directoryPath + "/" + folder, function (err, filesInFolder) {
      const fileName =
        filesInFolder && filesInFolder.find((a) => a.match(/^.*\.(xlsx)$/));

      // XSLX file located. This is where the processing happens
      if (fileName) {
        const workbook = XLSX.readFile(
          `./recordsFiles/textMessages/${folder}/${fileName}`,
          {
            cellDates: true,
          }
        );
        const sheet_name_list = workbook.SheetNames;
        let newTally = contactsJson.tally;
        let unparsed = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list[0]]
        );
        let conversations = {};
        let imagesArray = [];
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
                contactsJson.contacts[curr.toString().trim()] = {
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
            // Does this message have attachments?
            if (line["AttachmentCount"]) {
              //We are about to check if it is an image
              let imgExtension;

              // check if there's even a folder containing images for this message, then save the file contents
              const imagefiles =
                fs.existsSync(
                  `${directoryPath}/${folder}/files/${line["MessageId"]}`
                ) &&
                fs.readdirSync(
                  `${directoryPath}/${folder}/files/${line["MessageId"]}`
                );

              // If there are any images within the folder
              if (
                imagefiles &&
                imagefiles.find((a) =>
                  /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(a)
                )
              ) {
                const imagesInFolder = imagefiles.filter((a) =>
                  /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(a)
                );

                //For every image in the folder
                for (
                  let everyImgIndex = 0;
                  everyImgIndex < imagesInFolder.length;
                  everyImgIndex++
                ) {
                  const currentImg = imagesInFolder[everyImgIndex];

                  imgExtension = fileExtensionRegex.exec(currentImg)[0];
                  imagesArray.push({
                    path: `${directoryPath}/${folder}/files/${line["MessageId"]}`,
                    fileName: currentImg,
                    index: everyImgIndex,
                    msgId: line["MessageId"],
                  });

                  msgArray.push({
                    sender: line["Sender"],
                    text:
                      line["MessageId"].toString() +
                      everyImgIndex +
                      imgExtension,
                    time: Moment(line["Date (UTC)"]),
                    isImage: true,
                  });
                }
              }

              // The body of the message containing attachments
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

        const path = `./src/conversations/${sanitizedFolderName}`;

        mkdirp(getDirName(path), function (err) {
          if (err) return;

          // Create public folder for messages.json if it does not exist
          if (!fs.existsSync(`./src/conversations/${sanitizedFolderName}`)) {
            fs.mkdirSync(`./src/conversations/${sanitizedFolderName}`);
          }

          fs.writeFileSync(
            path + "/messages.json",
            JSON.stringify(conversations),
            () => {}
          );

          // this is where we move images over

          // Create public folder for images if it does not exist
          if (!fs.existsSync(`./public/images/${sanitizedFolderName}`)) {
            fs.mkdirSync(`./public/images/${sanitizedFolderName}`);
          }
          for (let i = 0; i < imagesArray.length; i++) {
            const imageDirectory = imagesArray[i].path;
            fs.readdir(imageDirectory, function (err, filesInImageFolder) {
              const nameofImage =
                filesInImageFolder &&
                filesInImageFolder.find((a) => a == imagesArray[i].fileName);

              if (nameofImage) {
                fs.copyFile(
                  `${imageDirectory}/${imagesArray[i].fileName}`,
                  `./public/images/${sanitizedFolderName}/${
                    imagesArray[i].msgId
                  }${imagesArray[i].index}${
                    fileExtensionRegex.exec(imagesArray[i].fileName)[0]
                  }`,
                  0,
                  () => {}
                );
              }
            });
          }
        });
      }
    });
  });
});
