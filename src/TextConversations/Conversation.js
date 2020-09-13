import React from "react";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import "./Conversation.css";
import { getFullName, getAbbrName } from "../utility.js";

const Conversation = (props) => {
  console.log(props);
  const { sender } = props;

  return (
    <div id="allConversations">
      {Object.values(props.texts).map((convo, i) => {
        if (!convo.members.includes(sender)) {
          return null;
        }

        return (
          <Paper className="conversation" elevation={12} id={i}>
            <span className="conversationInfo">
              <span className="members">
                {convo.members.map((a) => (
                  <Chip
                    className="memberChip"
                    color="primary"
                    label={getFullName(a)}
                  />
                ))}
              </span>
              {/* <a href={`#${i}`}>
                <IconButton color="primary">
                  <LinkIcon />
                </IconButton>
              </a> */}
            </span>

            {convo.messages.map((currentBlock, index) => {
              const senderIsSubject = currentBlock[0].sender === props.sender; //subject is the texter to highlight

              return (
                <section className={senderIsSubject ? "subject" : "contact"}>
                  <Avatar className="avatar">
                    {getAbbrName(currentBlock[0].sender)}
                  </Avatar>
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
          </Paper>
        );
      })}
    </div>
  );
};

export default Conversation;
