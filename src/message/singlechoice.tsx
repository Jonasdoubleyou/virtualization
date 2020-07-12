import * as React from "react";

import { Props, Message } from "./index";

import ShowText from "./showtext";

export interface SingleChoice extends Message {
  // the question:
  text: string;
  // All the possible answers:
  answers: Answer[];
  // wether the answer can be changed:
  unlock?: boolean;
}

export interface Answer {
  text: string;
  // the message to show if this answer is chosen:
  next: string;
  // An optional handler called on click, that has to call back to continue
  onClick?: (continuation?: () => void) => void;
  right?: boolean;
}

export function isSingleChoice(message: Message): message is SingleChoice {
  // If it got answers, it is a question
  return !!(message as any).answers && !(message as any).type;
}

interface State {
    // Gets set after the user answered the dialogue
    chosen?: string;
    // Should be set after the question was asked
    showAnswers?: true;
}

export class SingleChoiceUI extends React.Component<SingleChoice & Props, State> {

  render() {
    const {text, answers, continuation, unlock = false} = this.props;
    const { chosen = "", showAnswers = false } = this.state || {};

    const question = <div className="notification question">
      <ShowText text={text} done={() => this.setState({ showAnswers: true })} />
    </div>;

    if(!showAnswers)
      return question;

    // The buttons contain the answers, one is highlighted if chosen
    const buttons = answers.map(({text, next, onClick, right }) =>
      <div
        className = {chosen === text ? ((right === true ? "button chosen right" : (right === false ? "button chosen wrong" : "button chosen"))) : "button"}
        onClick={() => {
          // Prevent that a button triggers twice:
          if(chosen) {
            if(unlock) onClick(() => 0);
            return;
          }

          // Highlight the chosen one
          this.setState({ chosen: text });


          if(onClick) {
            // If there is a click handler, only continue when that calls back:
            if(onClick.length) {
              onClick(() => continuation(next));
            } else {
              onClick();
              continuation(next);
            }
          } else {
            // otherwise continue directly:
            continuation(next);
          }
        }}

      >{text}</div>
    );

    return [question, <div className="button-container">{buttons}</div>];
  }
}
