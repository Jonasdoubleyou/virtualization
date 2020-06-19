import * as React from "react";

type ReactContent = (JSX.Element | string)[];

// Make newlines and highlight certain passages, returns a JSX collection
// one\ntwo -> one<br>two
// one *highlight* two -> one <span class="highlight">highlight</span> two
// one _small cursive_ -> one <span class="small">small cursive</span> two
const format = wrap("_", text => <span className="small">{text}</span>)
                .wrap("*", text => <span className="highlight">{text}</span>)
                .replace("\n", content => content.concat(<br/>));

export default format;

// Wraps everything between two chars with wrap, otherwise nowrap if passed or the text stays as is
function wrap(char: string, innerWrap: (part: string) => JSX.Element, nowrap?: (part: string) => ReactContent) {
  function wrapper(text: string): ReactContent {
    const result = [];
    let index = 0;

    for(const part of text.split(char)) { // turn one *two* three into [one, two, three]
      if(index % 2) {
        result.push(innerWrap(part)); // wrap every second part ("two")
      } else if(nowrap) {
        result.push(...nowrap(part));
      } else {
        result.push(part);
      }

      index++;
    }

    return result;
  };

  // utility for nice chaining (wrapChar(a, wrapChar(b)) is the same as wrapChar(b).wrap(a))
  wrapper.wrap = (char: string, innerWrap: (part: string) => JSX.Element) => wrap(char, innerWrap, wrapper);
  wrapper.replace = (char: string, innerReplace: (part: ReactContent) => ReactContent) => replace(char, innerReplace, wrapper);

  return wrapper;
}

function replace(char: string, innerReplace: (data: ReactContent) => ReactContent, beforeReplace: (part: string) => ReactContent) {
  function replacer(text: string) {
    const result = [];
    for(const part of text.split(char)) // good flatMap usecase, but yet rarely supported :(
      result.push(...innerReplace(beforeReplace(part)));
    return result;
  }

  return replacer;
}
