import React from "react";
import Moment from "moment";
import "./Conversation.css";

let testConvo = {
  members: [],
  messages: [
    {
      sender: "Ichabod",
      message: "yo bro",
      time: Moment("5/27/2020  7:16:22 PM"),
    },
  ],
  lastSent: "a time",
};

function Conversation() {
  return (
    <div id="conversationBody">
      <section class="contact">
        <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
        <section class="msgs">
          <p>
            Ichabod, I'm having trouble with these lyrics, can you come over to
            help?
          </p>
        </section>
      </section>
      <section class="subject">
        <section class="msgs">
          <p>Sure, JJ. Which part are you getting stuck with?</p>
        </section>
      </section>
      <section class="contact">
        <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
        <section class="msgs">
          <p>I know what I want to say, but can't get the right onomotopeia</p>
        </section>
      </section>
      <section class="subject">
        <section class="msgs">
          <p>We'll work it out...</p>
          <p>Somehow</p>
          <p>I'm in love with dat Vicky</p>
        </section>
      </section>
      <section class="contact">
        <img src="https://ioneglobalgrind.files.wordpress.com/2014/03/screen-shot-2014-03-05-at-1-00-58-pm.png" />
        <section class="msgs">
          <p>You look great in her hair.</p>
          <p>I LOLed when you came out.</p>
          <p>It was so funny ;)</p>
          <p>LOL</p>
        </section>
      </section>
      <section class="subject">
        <section class="msgs">
          <p>Ya, IRK</p>
          <p>It was pretty funny, i thought.</p>
        </section>
      </section>
    </div>
  );
}

export default Conversation;
