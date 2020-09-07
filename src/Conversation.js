import React from "react";
import Moment from "moment";
import "./Conversation.css";
import testFile from "./conversations/student-2.json";
import { Avatar, getFullName } from "./Avatar.js";

const Conversation = () => {
  return (
    <div id="allConversations">
      {Object.values(testFile).map((convo, i) => {
        return (
          <div className="conversation">
            <span className="members">
              {convo.members.map((a) => getFullName(a)).join(", ")}
            </span>

            {convo.messages.map((currentBlock, index) => {
              const lastMsg = index > 0 && convo.messages[index - 1];
              const senderIsSubject = currentBlock[0].sender == 5038236773; //subject is the texter to highlight
              const moreThanTenMinutesSince =
                lastMsg &&
                Moment(currentBlock.time).diff(
                  Moment(lastMsg.time),
                  "minutes"
                ) > 10;

              return (
                <section className={senderIsSubject ? "subject" : "contact"}>
                  {console.log(currentBlock)}
                  <Avatar number={currentBlock[0].sender} />
                  <section className="msgs">
                    {currentBlock.map((message) => {
                      return (
                        <div className="msgBubble">
                          <p>
                            {
                              message.text &&
                                message.text.substring(
                                  1,
                                  message.text.length - 1
                                ) /* remove quotations */
                            }
                          </p>
                          <span className="time">
                            {/* Do not show time if msg was sent less than 30m from last one */}
                            {Moment(message.time).format("MMM Qo HH:mm")}
                            {/* Mon 00th 11:11  */}
                          </span>
                        </div>
                      );
                    })}
                  </section>
                </section>
              );
            })}
            {Object.values(testFile)[i + 1] && <hr />}
          </div>
        );
      })}
    </div>
  );
};

export default Conversation;
