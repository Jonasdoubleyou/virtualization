import * as React from "react";

import { Props, Message } from "./index";

import ShowText from "./showtext";

export interface TextArea extends Message {
  type: "textarea",
  // the question:
  text: string;
  // the submit button value:
  submit: string;
  onSubmit: (value: string) => void;

  next: string;
}

export function isTextArea(message: Message): message is TextArea {
  return (message as any).type && (message as any).type === "textarea";
}

interface State {
    // Should be set after the question was asked
    showChoice?: true;
    // The value the user entered
    input: string;
    // if the textarea was already filled out
    done?: boolean;
}


// Shows the question and an Input field, suggestions pop up below the field
export class TextAreaUI extends React.Component<TextArea & Props, State> {

  render() {
    const {text, submit, onSubmit, next, continuation} = this.props;
    const {showChoice = false, input = "", done = false } = this.state || {};

    const question = <div className="notification">
      <ShowText text={text} done={() => this.setState({ showChoice: true })} />
    </div>;

    if(!showChoice)
      return question;

    const inputEl = <textarea
      className="choice notification"
      value={input}
      onChange={e => this.setState({ input: e.target.value })}
      disabled={done} // disable input if user chose a value
    />;

    // If there is no input yet or the one was already chosen don't display submit button
    if(!input || done)
      return [question, inputEl];


    // The buttons contain the answers, one is highlighted if chosen
    const button = (
       <div
          className = "button"
          onClick={() => {
            onSubmit(input);
            continuation(next);
            this.setState({ done: true });
          }}
      >{submit}</div>
    );

    return [question, inputEl, <div className="button-container">{button}</div>];
  }
}
