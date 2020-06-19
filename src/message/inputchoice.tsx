import * as React from "react";

import { Props, Message } from "./index";

import ShowText from "./showtext";

export interface InputChoice extends Message {
  // the question:
  text: string;
  // All the possible answers:
  choices: string[];
  // The key to set
  storeAs: string;
  next: string;
}

export function isInputChoice(message: Message): message is InputChoice {
  // If it got answers, it is a question
  return !!(message as any).choices;
}

interface State {
    // Gets set after the user answered the dialogue
    chosen?: string;
    // Should be set after the question was asked
    showChoice?: true;
    // The value the user entered
    input: string;

}

function matches(original: string, to: string) {
  // Check if original begins with to, case-insensitive
  return original.toLowerCase().indexOf(to.toLowerCase()) === 0;
}

// Shows the question and an Input field, suggestions pop up below the field
export class InputChoiceUI extends React.Component<InputChoice& Props, State> {

  render() {
    const {text, choices, storeAs, next, continuation} = this.props;
    const { chosen = "", showChoice = false, input = "" } = this.state || {};

    const question = <div className="notification">
      <ShowText text={text} done={() => this.setState({ showChoice: true })} />
    </div>;

    if(!showChoice)
      return question;

    const inputEl = <input
      className="choice notification"
      value={input}
      onChange={e => this.setState({ input: e.target.value })}
      type="text"
      disabled={!!chosen} // disable input if user chose a value
    />;

    // If there is no input yet or the one was already chosen don't display choose buttons
    if(!input || chosen)
      return [question, inputEl];


    // The buttons contain the answers, one is highlighted if chosen
    const buttons = choices
      .filter(choice => matches(choice, /*to*/ input)) //only show the one selected by input
      .slice(0, 3) // only show the first three matches
      .map((text) =>
        <div
          className = "button"
          onClick={() => {
            continuation(next);
            this.setState({ input: text, chosen: text });
          }}

      >{text}</div>
    );

    // If there is only one choice left, select that
    if(buttons.length === 1)
      buttons[0].props.onClick();

    // If there is no valid choice, notify the user
    if(!buttons.length)
      return [
        question,
        inputEl,
        <div className="notification">
          Keine Ergebnisse. Hast du alles richtig geschrieben?
        </div>
      ];


    return [question, inputEl, <div className="button-container">{buttons}</div>];
  }
}
