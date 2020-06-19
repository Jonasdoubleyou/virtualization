import * as React from "react";
import format from "./textFormatting";




export default function ShowText({ text, done }: { text: string, done: () => void }) {

  React.useEffect(() => {
    const id = setTimeout(() => done(), 1000);
    return () => clearTimeout(id);
  }, []);

  return <span className="appear">{format(text)}</span>;
}
