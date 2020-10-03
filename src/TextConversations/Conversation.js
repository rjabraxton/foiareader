import React from "react";
import Moment from "moment";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
// import IconButton from "@material-ui/core/IconButton";
// import LinkIcon from "@material-ui/icons/Link";
import Linkify from "react-linkify";

import "./Conversation.css";
import { getFullName, getAbbrName } from "../utility.js";
import decodeUriComponent from "decode-uri-component";

const Conversation = (props) => {
  const { sender, onlyShowFrom, texts } = props;

  const cleanupMessageText = (text) => {
    let newText;

    if (text[0] === '"' && text[text.length - 1] === '"') {
      newText = text.substring(1, text.length - 1);
    } else {
      newText = text;
    }

    newText = decodeUriComponent(newText);

    return <Linkify>{newText.replace("&apos;", "'")}</Linkify>;
  };

  const getTime = (msgTime) => {
    if (Moment().year() === Moment(msgTime).year()) {
      return Moment(msgTime).format("hh:mma, MMM Qo");
    } else {
      return Moment(msgTime).format("hh:mma, MMM Qo 'YY");
    }
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

              {/* <a href={`#${i}`}>
                <IconButton color="primary">
                  <LinkIcon />
                </IconButton>
              </a> */}
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
                      if (!message.text) return null;
                      return (
                        <div key={`msgBubble${i}`} className="msgBubble">
                          <p>
                            {message.text &&
                              !message.isImage &&
                              cleanupMessageText(message.text)}
                            {message.isImage && (
                              // eslint-disable-next-line jsx-a11y/alt-text
                              <img
                                className="textedImage"
                                src={`${props.imagePrefix + message.text}`}
                              />
                            )}
                          </p>
                          <span className="time">{getTime(message.time)}</span>
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
