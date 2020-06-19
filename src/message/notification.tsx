import * as React from "react";

import { Props, Message } from "./index";

import ShowText from "./showtext";

export interface Notification extends Message {
  // the message shown
  text: string;
  // How long the message will be shown
  time?: number;
  headline?: boolean;
  // the message to show afterwards
  next: string;
}

export function isNotification(message: Message): message is Notification {
  return !!(message as any).next;
}

export class NotificationUI extends React.Component<Notification & Props, {}> {

  timer?: number;

  shown() {
    const { continuation, next, time = 2000 } = this.props;
    this.timer = setTimeout(() => continuation(next), time);
  }

  componentWillUnmount() {
    if(this.timer)
      clearTimeout(this.timer);
  }

  render() {
    const {text, time, headline} = this.props;
    if(headline) {
      return <h2 className="notification">
        <ShowText text={text} done={() => this.shown()}/>
      </h2>;
    }
    return <div className="notification">
      <ShowText text={text} done={() => this.shown()}/>
    </div>;
  }
}
