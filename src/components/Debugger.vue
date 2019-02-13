<template>
  <div class="debugger">
    <div class="toolbar">
      <icon 
        tooltip="Start Debugging"
        top
        icon="play_arrow"
        @click="$emit('debug')"
        style="margin-left: -18px"
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
      style="height: calc(100% - 48px)"
      class="json"
      ref="pretty"
      :deep="1"
      :data="showData"
    ></vue-json-pretty>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { COUNTER, MEM, REG } from '@/parser';
import VueJsonPretty from 'vue-json-pretty';
import Icon from '@/components/Icon.vue';

@Component({ components: { VueJsonPretty, Icon } })
export default class Debugger extends Vue {
  @Prop({ required: false }) public program!: Generator; // I'm not sure how to specify a Generator type
  @Prop({ type: Boolean, required: true }) public debugging!: boolean;
  @Prop({ type: Number, required: true }) public lineNumber!: number;

  public registers = REG;

  public debugData = {
    registers: REG,
    memory: MEM,
    count: COUNTER,
  };

  get showData() {
    if (this.debugging) {
      return this.debugData;
    }
  }

  public nextLine() {
    if (this.program) {
      const isDone = this.program.next().done;
      this.debugData.count = COUNTER;
      this.$emit('update:lineNumber', COUNTER);

      // FORCE the children to re-render with the new data :)
      // There is DEFINITELY a better way to do this
      const pretty = this.$refs.pretty as Vue;
      pretty.$children.forEach((v) => v.$forceUpdate());

      if (isDone) {
        this.stop();
      }
    }
  }

  public stop() {
    this.$emit('update:debugging', false);
  }
}
</script>

<style lang="sass" scoped>
.json
  overflow-y: auto
  overflow-x: hidden
</style>