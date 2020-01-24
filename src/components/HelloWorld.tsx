import Vue, { CreateElement, VNode } from "vue";
import Component from "vue-class-component";
import RC from "@src/components/renderComponent.vue";
import TestMixin from "../mixins/test-mixin";
import { Getter } from "vuex-class";
import "./test.css";

@Component({
  components: {
    RC
  },
  mixins: [TestMixin]
})
export default class HelloWorld extends Vue<TestMixin> {
  @Getter info;

  msg = "Welcome to Vue-TSX App";

  mounted(): void {
    console.log(this.testMixinArg);
    console.log("这是 _.assign({})", _.assign({}));
    console.log(this.info);
  }
  render(h: CreateElement): VNode {
    return (
      <div class="hello">
        <h1>{this.msg}</h1>
        <h2>vue-typescrip-starter</h2>
        <p>mixin 数据 ：{this.testMixinArg}</p>
        <p>store 数据 ：{this.info.data}</p>
        <RC></RC>
      </div>
    );
  }
}
