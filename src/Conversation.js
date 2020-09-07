import React from "react";
import Moment from "moment";
import "./Conversation.css";
import testFile from "./conversations/student-2.json";
import Avatar from "./Avatar.js";

const Conversation = () => {
  console.log(testFile);
  return (
    <div id="conversationBody">
      {Object.values(testFile).map((convo) => {
        return (
          <div>
            <span>{convo.members.join(", ")}</span>

            {convo.messages.map((currentBlock, index) => {
              const lastMsg = index > 0 && convo.messages[index - 1];
              const senderIsSubject = currentBlock[0].sender == 5038236773; //subject is the texter to highlight
              const moreThanThirtyMinutesSince =
                lastMsg &&
                Moment(currentBlock.time).diff(
                  Moment(lastMsg.time),
                  "minutes"
                ) > 30;

              return (
                <section className={senderIsSubject ? "subject" : "contact"}>
                  <span>
                    {/* Do not show time if msg was sent less than 30m from last one */}
                    {(index === 0 || moreThanThirtyMinutesSince) &&
                      Moment(currentBlock.time).format("MMM Qo HH:mm")}
                    {/* Mon 00th 11:11  */}
                  </span>
                  <Avatar number={currentBlock[0].sender} />
                  <section className="msgs">
                    {currentBlock.map((message) => {
                      return (
                        <p>
                          {
                            message.text &&
                              message.text.substring(
                                1,
                                message.text.length - 1
                              ) /* remove quotations */
                          }
                        </p>
                      );
                    })}
                  </section>
                </section>
              );
            })}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
