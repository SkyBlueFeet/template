/* eslint-disable @typescript-eslint/no-var-requires */
import json5 from "json5";

export default function(source: string): string {
  return `module.exports=${JSON.stringify(json5.parse(source))}`;
}
