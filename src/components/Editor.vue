<template>
  <div class="editor">
    <v-textarea 
      class="textarea"
      :value="value"
      ref="input"
      @input="input"
      @keydown="keydown"
      v-bind="$attrs"
      no-resize
      :append-icon="copy ? 'file_copy' : undefined"
      @click:append="appendCb"
    ></v-textarea>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';

@Component
export default class Editor extends Vue {
  @Prop({ type: String, required: true }) public value!: string;
  @Prop(Boolean) public copy!: boolean;
  @Prop({ type: Number, required: false }) public highlightLine?: number;

  public mounted() {
    this.styleLine();
  }

  public input(text: string) {
    this.$emit('input', text);
  }

  public keydown(e: KeyboardEvent) {
    if (e.which === 9) {
      e.preventDefault();
      this.$emit('input', this.value + '    ');
    }
  }

  public appendCb(e: MouseEvent) {
    if (this.copy) {
      this.$emit('copy', e);
    }
  }

  @Watch('highlightLine')
  public styleLine() {
    if (this.highlightLine === undefined) {
      return;
    }

    const lines = this.value.split('\n');

    // calculate start/end
    let startPos = 0;
    for (let x = 0; x < lines.length; x++) {
        if (x === this.highlightLine) {
          break;
        }
        startPos += (lines[x].length + 1);
    }

    const endPos = lines[this.highlightLine].length + startPos;

    const el = this.$el as HTMLElement;
    const textArea = Array.from(el.getElementsByTagName('textarea'))[0];

    textArea.focus();
    textArea.selectionStart = startPos;
    textArea.selectionEnd = endPos;
  }
}
</script>

<style lang="sass" scoped>
.editor
  position: relative

// Use absolute so the textarea doesn't jump
// https://stackoverflow.com/questions/15475010/text-area-in-html-jumps-on-focus
.textarea
  border-radius: 10px
  border: none
  top: 0
  bottom: 0
  width: 100%
  position: absolute

  & /deep/ .v-input__control, /deep/ .v-input__slot, /deep/ .v-text-field__slot
    height: 100%

  & /deep/ textarea
    margin: 0

  & /deep/ .v-input__slot
    margin: 0
</style>