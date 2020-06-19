import { Image } from "./../message/image";
import { MultipleChoice } from "../message/multiplechoice";
import { InputChoice } from "../message/inputchoice";
import { Popup } from "../message/popup";

type Message = Image | InputChoice | MultipleChoice | Notification | Popup;

const messageByID: {[id: string]: Omit<Message, "id"> } = {
  start: {
    type: "popup",
    text: "_Datenschutz_  |  _Impressum_",
    popupText: "*Impressum:*\n\n Herausgeber:\nJonas Wilms\nAsselermoor 17\n21706 Drochtersen\njonaswilms2000@gmail.com\n\nDiese Seite speichert nichts ... außer, das du da warst (deine IP landet bestimmt in einigen serverlogs).", 
    time: 0,
    next: "headline",
  },

  headline: {
    text: "Eine virtuelle Welt der\n*Virtualisierung*\n_von Jonas Wilms_",
    headline: true,
    time: 1000,
    next: "begin",
  },

  begin: {
    text: "Du kannst dir die Inhalte nochmals interaktiv erarbeiten, oder auch direkt mit einigen Übungsfragen beginnen",
    answers: [
      { text: "Von vorne beginnen" },
      { text: "Üben", next: "train" }
    ],
  },

  train: {
    text: "Nun ein paar kleine Quizfragen, um das gelernte zu wiederholen!",
    next: "q1",
  },

  q1: {
    text: "Durch VLANs können Anwendungen virtualisiert werden.",
    answers: [
      { text: "Wahr", right: false, next: "q1_r" },
      { text: "Falsch", right: true, next: "q1_w" }
    ],
  },

  q1_w: {
    text: "Genau, _Virtual Local Area Networks_ sind eine Technik zur Netzwerkvirtualisierung",
    next: "q2"
  },

  q1_r: {
    text: "Falsch, _Virtual Local Area Networks_ sind eine Möglichkeit, um Netzwerke zu virtualisieren, nicht Anwendungen",
    next: "q2"
  },

  q2: {
    type: "multiple",
    text: "Vorteile von Netzwerkvirtualisierung sind ...",
    answers: [
      { text: "Einfaches Austauschen von Diensten", right: true },
      { text: "Ermöglicht Redundanzen", right: true },
      { text: "Ist sehr einfach einzurichten", right: false }
    ],
    next: "q2_a"
  },

  q2_a: {
    text: "Netzerkvirtualisierung ermöglicht vieles, aber einfach zu konfigurieren ist sie nicht: Es müssen Protokolle wie OSPF benutzt werden, und Netzwerk ist sehr komplex und schwer zu debuggen.",
    next: "end"
  }

 



};

export default messageByID;
