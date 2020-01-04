/* eslint-disable @typescript-eslint/no-var-requires */
import json5 from "json5";

module.exports = function(source: string): unknown {
    return `module.exports=${JSON.stringify(json5.parse(source))}`;
};
