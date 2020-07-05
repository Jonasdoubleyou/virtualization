import * as React from "react";
import { Message } from "./index";

interface Code extends Message  {
    code: string; 
    continuation?: (next: string) => void;
    next: string;
}

export function isCode(message: any): message is Code {
    return !!message.code;
}

export function CodeUI({ continuation, next, code }: Code) {
    const ref = React.useRef();

    React.useEffect(() => {
        (ref.current as any).innerHTML = code;
        continuation(next);
    }, []);

    return <div ref={ref}></div>;
}

