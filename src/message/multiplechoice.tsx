import * as React from "react";

import { Props, Message } from "./index";

import ShowText from "./showtext";

export interface MultipleChoice extends Message {
  type: "multiple";
  // the question:
  text: string;
  // All the possible answers:
  answers: Answer[];
  // wether the answer can be changed:
  unlock?: boolean;
  // the message to show if this answer is chosen:
  next: string;
}

export interface Answer {
  text: string;
  // An optional handler called on click, that has to call back to continue
  onClick?: (continuation?: () => void) => void;
  right?: boolean;
}

export function isMultipleChoice(message: Message): message is MultipleChoice {
  // If it got answers, it is a question
  return !!(message as any).answers && (message as MultipleChoice)?.type === "multiple";
}

interface State {
    // Gets set after the user answered the dialogue
    chosen?: string[];
    done: boolean;
    // Should be set after the question was asked
    showAnswers?: true;
}

export class MultipleChoiceUI extends React.Component<MultipleChoice & Props, State> {

  render() {
    const {text, answers, continuation, unlock = false, next } = this.props;
    const { chosen = [], done = false,  showAnswers = false } = this.state || {};

    const question = <div className="notification question">
      <ShowText text={text} done={() => this.setState({ showAnswers: true })} />
    </div>;

    if(!showAnswers)
      return question;

    // The buttons contain the answers, one is highlighted if chosen
    const buttons = answers.map(({text, right }) => {
      const active = chosen.indexOf(text) !== -1;
      
      return <div
        className = {(active ? "button " : "button not-chosen ") + (done ? (right === active  ? "right" : "wrong") : "")}
        onClick={() => {
          // Prevent that a button triggers twice:
          if(done) return;

          if(chosen.indexOf(text) === -1) {
            this.setState({ chosen: [...chosen, text] });
          } else {
            this.setState({ chosen: chosen.filter(it => it !== text)});
          }
        }}
      >{text}</div>;
      });

    buttons.push(<div className="button chosen" onClick={() => {
      if(done) return;
      this.setState({ done: true });
      continuation(next);
    }}>Weiter</div>)

    return [question, <div className="button-container">{buttons}</div>];
  }
}
