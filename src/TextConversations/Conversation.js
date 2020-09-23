import React from "react";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import LinkIcon from "@material-ui/icons/Link";

import "./Conversation.css";
import { getFullName, getAbbrName } from "../utility.js";

const Conversation = (props) => {
  const { sender, onlyShowFrom, texts } = props;

  const hashLink = (index) => {
    console.log(index);
    console.log(onlyShowFrom);
  };

  return (
    <div id="allConversations">
      {Object.values(texts).map((convo, i) => {
        if (
          convo.members &&
          (onlyShowFrom.length > 0
            ? !convo.members.some((a) =>
                onlyShowFrom.map((b) => b.number).includes(a)
              )
            : false)
        ) {
          return null;
        }

        return (
          <Paper
            className="conversation"
            elevation={12}
            id={i}
            key={`messageBlock${i}`}
          >
            <span className="conversationInfo">
              <span className="members">
                {convo.members.map((member, i) => (
                  <Chip
                    key={`memberChip${i}`}
                    className="memberChip"
                    color="primary"
                    label={getFullName(member)}
                  />
                ))}
              </span>

              <IconButton
                color="primary"
                onClick={() => {
                  hashLink(i);
                }}
              >
                <LinkIcon />
              </IconButton>
            </span>

            {convo.messages.map((currentBlock, index) => {
              const senderIsSubject = currentBlock[0].sender === sender; //subject is the texter to highlight

              return (
                <section
                  className={senderIsSubject ? "subject" : "contact"}
                  key={`message${index}`}
                >
                  <Avatar className="avatar">
                    {getAbbrName(currentBlock[0].sender)}
                  </Avatar>
                  <section className="msgs">
                    {currentBlock.map((message, i) => {
                      return (
                        <div key={`msgBubble${i}`} className="msgBubble">
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
          </Paper>
        );
      })}
    </div>
  );
};

export default Conversation;
