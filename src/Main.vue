<template>
  <div id="app" style="display: flex; flex-direction: column">
    <a 
      href="https://github.com/jsmith/assembly" 
      target="__blank"
      class="github"
    >
      GitHub
    </a>
    <div class="banner">JACOBS TEXT MAGIC</div>
    <div class="row grow">
      <editor 
        class="input grow col" 
        v-model="input"
        :highlight-line="highlightLine"
        outline
        autofocus
        share
        @share="copyUrl"
      ></editor>
      <div class="col grow">
        <editor
          class="output" 
          outline
          :style="editorStyle"
          :value="output"
          readonly
        ></editor>
        <div class="dragger-wrapper">
          <drag-element
            class="dragger"
            cursor="ns-resize"
            @move="resizeRightSide"
          ></drag-element>
        </div>
        <debugger
          :program="program"
          :style="debugStyle"
          :debugging.sync="debugging"
          @compile="parse"
          @debug="debug"
        ></debugger>
      </div>
      
    </div>
    <v-snackbar v-model="show">Copied URL to clipboard.</v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Editor from '@/components/Editor.vue';
import Debugger from '@/components/Debugger.vue';
import { parse, debug, SourceMap, programData } from '@/parser';
import { DragElement } from '@/draggable';

@Component({ components: { Editor, Debugger, DragElement } })
export default class Main extends Vue {
  public input = '';
  public output = '';
  public show = false;
  public offset = 0;

  public debugging = false;
  public program: Generator | null = null;
  public sourceMap: SourceMap | null = null;

  get editorStyle() {
    return {
      height: `calc(50% + ${this.offset}px)`,
    };
  }

  get debugStyle() {
    return {
      height: `calc(50% - ${this.offset}px)`,
    };
  }

  get highlightLine() {
    if (this.debugging && this.sourceMap) {
      return this.sourceMap[programData.counter];
    }
  }

  public mounted() {
    window.addEventListener('keydown', this.keydown);

    const input = this.$route.query.text;
    if (input && typeof input === 'string') {
      this.input = input;
    }
  }

  public destroyed() {
    window.removeEventListener('keydown', this.keydown);
  }

  public keydown(event: KeyboardEvent) {
    // 83 === s
    if (event.which !== 83 || !event.ctrlKey) { return; }
    event.preventDefault();
    this.parse();
  }

  public parse() {
    try {
      const { instructions, sourceMap } = parse(this.input);
      this.sourceMap = sourceMap;
      this.output = instructions.map(({ hex }) => hex).join('\n');
      return instructions;
    } catch (e) {
      this.output = e.message;
      return null;
    }
  }

  public debug() {
    const instructions = this.parse();
    if (!instructions) {
      return;
    }

    this.program = debug(instructions);
    this.debugging = true;
  }

  public copyUrl() {
    // Yeah lol so this is a bit messy but I'm not sure if there is an easier way
    const a = document.createElement('a');
    const query: {} = this.input ? { text: this.input } : {};

    a.href = this.$router.resolve({
      path: this.$route.path,
      query,
    }).href;

    const url = a.protocol + '//' + a.host  + a.pathname + a.search + a.hash;
    const el = document.createElement('textarea');
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    this.show = true;
  }

  public resizeRightSide(e: MouseEvent) {
    this.offset += e.movementY;
  }
}
</script>

<style lang="sass" scoped>
.output
  background: #fff
  white-space: pre
  height: 100%

.banner
  height: 200px
  line-height: 200px
  width: 100%
  margin: 0px auto 10px
  color: #333
  text-align: center
  font-size: 70px
  text-transform: uppercase
  font-weight: bold
  text-align: center
  color: #FFFFFF
  background: #005DFF
  text-shadow: -5px 5px 0px #00e6e6, -10px 10px 0px #01cccc, -15px 15px 0px #00bdbd

.row
  display: flex

.grow
  flex: 1

.col
  display: flex
  flex-direction: column
  margin: 10px

.github
  position: absolute
  right: 20px
  top: 10px
  color: #bfd6ff
  border-bottom: #6099ff 1px solid
  text-decoration: none

.dragger-wrapper
  position: relative

.dragger
  position: absolute
  height: 10px
  width: 100%
</style>