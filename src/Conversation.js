import React from "react";
import Moment from "moment";
import "./Conversation.css";
import testFile from "./conversations/student-2.json";

function Conversation() {
  return (
    <div id="conversationBody">
      {Object.values(testFile).map((convo) => {
        return (
          <div>
            <span>{convo.members.join(", ")}</span>
            {convo.messages.map((current, index) => {
              return (
                <section className="contact">
                  {current.sender !== 5038236656 && (
                    <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
                  )}
                  <section className="msgs">
                    <p>{current.text}</p>
                  </section>
                </section>
              );
            })}
            <hr />
          </div>
        );
      })}

      <section className="contact">
        <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
        <section className="msgs">
          <p>
            Ichabod, I'm having trouble with these lyrics, can you come over to
            help?
          </p>
        </section>
      </section>
      <section className="subject">
        <section className="msgs">
          <p>Sure, JJ. Which part are you getting stuck with?</p>
        </section>
      </section>
      <section className="contact">
        <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
        <section className="msgs">
          <p>I know what I want to say, but can't get the right onomotopeia</p>
        </section>
      </section>
      <section className="subject">
        <section className="msgs">
          <p>We'll work it out...</p>
          <p>Somehow</p>
          <p>I'm in love with dat Vicky</p>
        </section>
      </section>
      <section className="contact">
        <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
        <section className="msgs">
          <p>You look great in her hair.</p>
          <p>I LOLed when you came out.</p>
          <p>It was so funny ;)</p>
          <p>LOL</p>
        </section>
      </section>
      <section className="subject">
        <section className="msgs">
          <p>Ya, IRK</p>
          <p>It was pretty funny, i thought.</p>
        </section>
      </section>
    </div>
  );
}

export default Conversation;
