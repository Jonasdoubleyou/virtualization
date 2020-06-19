import * as React from "react";

import {Notification, NotificationUI, isNotification} from "./notification";
import {MultipleChoice, MultipleChoiceUI, isMultipleChoice} from "./multiplechoice";
import {InputChoice, InputChoiceUI, isInputChoice} from "./inputchoice";
import {Image, ImageUI, isImage} from "./image";
import {TextArea, TextAreaUI, isTextArea} from "./textarea";
import {Popup, PopupUI, isPopup} from "./popup";
import { isSingleChoice, SingleChoiceUI } from "./singlechoice";

export interface Message {
  id: string;
  text: string;
}

export interface Props {
  continuation?: (next: string) => void;
}




export const MessageUI = (props: Message & Props) => {
  if(isPopup(props))
    return <PopupUI {...props} />;
    
  if(isTextArea(props))
    return <TextAreaUI {...props} />;

  if(isMultipleChoice(props))
    return <MultipleChoiceUI {...props} />;

  if(isSingleChoice(props))
    return <SingleChoiceUI {...props} />

  if(isInputChoice(props))
    return <InputChoiceUI {...props} />;

  if(isImage(props))
    return <ImageUI {...props} />;

  if(isNotification(props))
    return <NotificationUI {...props} />;

  return <div>Fehler. Sorry.</div>;
}
