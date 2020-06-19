import * as React from "react";

import { Props, Message } from "./index";

import ShowText from "./showtext";

export interface Image extends Message {
  type: "image";
  // the message shown
  src: string;
  alt?: string;
  // How long the message will be shown
  time?: number;
  // the message to show afterwards
  next: string;

  noBorder?: boolean;
}

export function isImage(message: Message): message is Image {
  return !!(message as any).src;
}

export class ImageUI extends React.Component<Image & Props, {}> {

  timer?: number;

  componentDidMount() {
    const { continuation, next, time = 2000 } = this.props;
    this.timer = setTimeout(() => continuation(next), time);
  }

  componentWillUnmount() {
    if(this.timer)
      clearTimeout(this.timer);
  }

  render() {
    const {src, alt, noBorder } = this.props;

    return <div className="notification">
      <img
        className="notification"
        src={src}
        alt={alt}
        style={noBorder ? { border: "none" } : {}}
      />
    </div>;
  }
}
