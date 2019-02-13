<template>
  <div class="debugger">
    <div class="toolbar">
      <icon 
        tooltip="Compile To Binary"
        top
        icon="build"
        @click="$emit('compile')"
        style="margin-left: -18px"
        :disabled="debugging"
      ></icon>
      <icon 
        tooltip="Start Debugging"
        top
        icon="bug_report"
        @click="$emit('debug')"
        :disabled="debugging"
      ></icon>
      <icon 
        tooltip="Stop Debugging"
        top
        icon="stop"
        @click="stop"
        :disabled="!debugging"
      ></icon>
      <icon 
        tooltip="Next Line"
        top
        :disabled="!debugging" 
        icon="arrow_forward"
        @click="nextLine"
      ></icon>
    </div>
    <!-- Height is kinda HARDcoded but oh well -->
    <vue-json-pretty
      v-if="debugging"
      style="height: calc(100% - 48px)"
      class="json"
      ref="pretty"
      :deep="1"
      :data="programData"
    ></vue-json-pretty>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { programData } from '@/parser';
import VueJsonPretty from 'vue-json-pretty';
import Icon from '@/components/Icon.vue';

@Component({ components: { VueJsonPretty, Icon } })
export default class Debugger extends Vue {
  @Prop({ required: false }) public program!: Generator; // I'm not sure how to specify a Generator type
  @Prop({ type: Boolean, required: true }) public debugging!: boolean;

  public programData = programData;

  public nextLine() {
    if (this.program) {
      const isDone = this.program.next().done;

      // FORCE the children to re-render with the new data :)
      // There is DEFINITELY a better way to do this
      const pretty = this.$refs.pretty as Vue;

      // Pretty may be undefined if the view hasn't rendered yet!
      if (pretty) {
        pretty.$children.forEach((v) => v.$forceUpdate());
      }

      if (isDone) {
        this.stop();
      }
    }
  }

  public stop() {
    this.$emit('update:debugging', false);
  }

  @Watch('debugging')
  public start() {
    if (this.debugging) {
      this.nextLine();
    }
  }
}
</script>

<style lang="sass" scoped>
.json
  overflow-y: auto
  overflow-x: hidden
</style>