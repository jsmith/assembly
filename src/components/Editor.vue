<template>
  <div class="editor">
    <div class="backdrop" ref="backdrop">
      <div class="highlights" v-html="html"></div>
    </div>
    <textarea 
      class="textarea"
      :value="value"
      ref="textarea"
      @input="input"
      @keydown="keydown"
      v-bind="$attrs"
      no-resize
      @scroll="handleScroll"
    ></textarea>
    <icon 
      v-if="share"
      @click="appendCb"
      class="icon"
      :icon="'share'"
      tooltip="Copy URL"
    ></icon>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({ components: { Icon } })
export default class Editor extends Vue {
  @Prop({ type: String, required: true }) public value!: string;
  @Prop(Boolean) public share!: boolean;

  // USE this https://codepen.io/lonekorean/pen/gaLEMR
  // We need to improve our solution ^^^
  @Prop({ type: Number, required: false }) public highlightLine?: number;

  public $refs!: {
    textarea: HTMLTextAreaElement;
    backdrop: HTMLElement;
  };

  get lines() {
    return this.value.split('\n');
  }

  get html() {
    let html: string;
    if (this.highlightLine === undefined) {
      html = this.value;
    } else {
      const before = this.lines.slice(0, this.highlightLine);
      const after = this.lines.slice(this.highlightLine + 1);
      html = [
        ...before,
        `<mark>${this.lines[this.highlightLine]}</mark>`,
        ...after,
      ].join('\n');
    }

    return html;
  }

  public input(e: { target: HTMLTextAreaElement }) {
    this.$emit('input', e.target.value);
  }

  public keydown(e: KeyboardEvent) {
    if (e.which === 9) {
      e.preventDefault();
      this.$emit('input', this.value + '    ');
    }
  }

  public appendCb(e: MouseEvent) {
    if (this.share) {
      this.$emit('share', e);
    }
  }

  public handleScroll() {
    this.$refs.backdrop.scrollTop = this.$refs.textarea.scrollTop;
    this.$refs.backdrop.scrollLeft = this.$refs.textarea.scrollLeft;
  }
}
</script>

<style lang="sass" scoped>
.editor
  position: relative

.backdrop, textarea
  padding: 5px

.backdrop
  position: absolute
  z-index: 1
  border: 2px solid #685972
  background-color: #fff
  overflow: auto
  pointer-events: none
  transition: transform 1s
  height: 100%
  width: 100%

textarea
  display: block
  position: absolute
  z-index: 2
  margin: 0
  border: 2px solid #74637f
  border-radius: 0
  color: #444
  background-color: transparent
  overflow: auto
  resize: none
  transition: transform 1s

textarea:focus
  outline: none
  box-shadow: 0 0 0 2px #c6aada

.highlights
	white-space: pre-wrap
	word-wrap: break-word
	color: transparent

.highlights /deep/ mark
  border-radius: 3px
  color: transparent
  background-color: #b1d5e5

.icon
  position: absolute
  right: 0
  top: 0
  z-index: 4

// Use absolute so the textarea doesn't jump
// https://stackoverflow.com/questions/15475010/text-area-in-html-jumps-on-focus
.textarea
  border: none
  top: 0
  bottom: 0
  width: 100%
  position: absolute
</style>