import React from "react";
import { Text } from "react-native";
import { MathText } from "../MathText";

/** Highlights stay in session state; question/response content is not edited. */
export default function ExamText({ text = "", quote = "", style }: any) {
  const at = quote ? text.indexOf(quote) : -1;
  if (at < 0 || text.includes("$")) return <MathText text={text} style={style} selectable />;
  return <Text selectable style={style}>{text.slice(0, at)}<Text style={{ backgroundColor: "#ffe88a", color: "#141414" }}>{quote}</Text>{text.slice(at + quote.length)}</Text>;
}
