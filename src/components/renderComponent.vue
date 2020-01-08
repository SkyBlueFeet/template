<script lang="tsx">
import { Vue, Component } from "vue-property-decorator";
import { VNode } from "vue";

@Component({})
export default class FilterItem extends Vue {
  render(h, context): VNode {
    return <div>这条是JSX</div>;
  }
}
</script>
