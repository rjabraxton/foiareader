import React from "react";
import Moment from "moment";
import "./Conversation.css";
import testFile from "./conversations/student-2.json";
import Avatar from "./Avatar.js";

const Conversation = () => {
  return (
    <div id="conversationBody">
      {Object.values(testFile).map((convo) => {
        return (
          <div>
            <span>{convo.members.join(", ")}</span>

            {convo.messages.map((current, index) => {
              const lastMsg = index > 0 && convo.messages[index - 1];
              const senderIsSubject = current.sender == 5038236773; //subject is the texter to highlight
              const moreThanThirtyMinutesSince =
                lastMsg &&
                Moment(current.time).diff(Moment(lastMsg.time), "minutes") > 30;

              return (
                <section className={senderIsSubject ? "subject" : "contact"}>
                  <span>
                    {(index === 0 || moreThanThirtyMinutesSince) &&
                      Moment(current.time).format("MMM Qo HH:mm")}
                    {/* Mon 00th 11:11  */}
                  </span>
                  <Avatar number={current.sender} />
                  <section className="msgs">
                    <p>
                      {
                        current.text &&
                          current.text.substring(
                            1,
                            current.text.length - 1
                          ) /* remove quotations */
                      }
                    </p>
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
