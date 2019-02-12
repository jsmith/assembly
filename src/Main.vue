<template>
  <div id="app" style="display: flex; flex-direction: column">
    <div class="banner">JACOBS TEXT MAGIC</div>
    <div class="row grow">
      <editor 
        class="input grow col" 
        v-model="input"
        outline
        autofocus
        copy
        @copy="copyUrl"
      ></editor>
      <editor 
        class="output grow col" 
        outline
        :value="output"
        readonly
      ></editor>
    </div>
    <v-snackbar v-model="show">Copied URL to clipboard.</v-snackbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Editor from '@/components/Editor.vue';
import { parse } from '@/parser';

@Component({ components: { Editor } })
export default class Main extends Vue {
  public input = '';
  public output = '';
  public show = false;

  public mounted() {
    window.addEventListener('keydown', this.parse);

    const input = this.$route.query.text;
    if (input && typeof input === 'string') {
      this.input = input;
    }
  }

  public destroyed() {
    window.removeEventListener('keydown', this.parse);
  }

  public parse(event: KeyboardEvent) {
    // 83 === s
    if (event.which !== 83 || !event.ctrlKey) { return; }
    event.preventDefault();

    try {
      this.output = parse(this.input).map(({ hex }) => hex).join('\n');
    } catch (e) {
      this.output = e.message;
    }
  }

  public copyUrl() {
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
}
</script>

<style lang="sass" scoped>
.output
  background: #fff
  white-space: pre

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
  margin: 10px
</style>