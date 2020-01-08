import prodEnv from "./prod.env";
import { merge } from "lodash";

export default merge(prodEnv, {
  NODE_ENV: "development"
});
