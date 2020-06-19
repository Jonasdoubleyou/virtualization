import * as React from "react";
import format from "./textFormatting";

import { Props, Message } from "./index";

import ShowText from "./showtext";

export interface Popup extends Message {
  type: "popup";
  // the message shown
  text: string;
  popupText: string;
  // How long the message will be shown
  time?: number;
  // the message to show afterwards
  next: string;
}

export function isPopup(message: Message): message is Popup {
  return (message as any).type === "popup";
}


interface State {
  showPopup?: boolean;
}

export class PopupUI extends React.Component<Popup & Props, State> {

  timer?: number;

  shown() {
    const { continuation, next, time = 2000 } = this.props;
    const { showPopup = false} = this.state || {};
    // if the popup is shown, do not set a timer to continue, the popup will continue when closed
    if(showPopup) return;
    this.timer = setTimeout(() => continuation(next), time);
  }

  componentWillUnmount() {
    if(this.timer)
      clearTimeout(this.timer);
  }

  showPopup() {
    this.setState({ showPopup: true });
    if(this.timer) clearTimeout(this.timer);
  }

  hidePopup() {
    // hide popup
    this.setState({ showPopup: false });
    // always continue and kill timer
    const { continuation, next, time = 2000 } = this.props;
    if(this.timer) clearTimeout(this.timer);
    continuation(next);
  }

  render() {
    const {text, popupText} = this.props;
    const { showPopup = false } = this.state || {};

    const msg =  <div className="notification popupButton" onClick={() => this.showPopup()}>
      <ShowText text={text} done={() => this.shown()}/>
    </div>;

    const popup = <div className="popup" style={{ display: showPopup ? "block" : "none" }} >
      {...format(popupText + "\n\n")}
      <span className="highlight" onClick={() => this.hidePopup()}>Schließen</span><br /><br />
    </div>;

    return [msg, popup];
  }
}
