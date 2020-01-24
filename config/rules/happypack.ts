import HappyPackPlugin from "happypack";
import { Plugin, RuleSetRule, Rule } from "webpack";

export interface MixinRuleOptions {
  id: string;
  setRule: boolean;
  rule: Rule;
}

export interface MixinRuleResult {
  rules: RuleSetRule[];
  plugins: Plugin[];
}

export default function MixinRuleHandler(
  options: MixinRuleOptions[]
): MixinRuleResult {
  return {
    rules: options.map(value => {
      const _res: RuleSetRule = {
        ...value.rule,
        loader: `happypack/loader?id=${value.id}`,
        use: undefined
        // options: undefined
      };
      return value.setRule ? _res : undefined;
    }),
    plugins: options.map(
      value =>
        new HappyPackPlugin({
          id: value.id,
          threads: 3,
          loaders: value.rule.use
        })
    )
  };
}
