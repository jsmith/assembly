<template>
  <v-app>
    <v-content>
      <div id="app" style="display: flex; flex-direction: column">
        <div class="banner">JACOBS TEXT MAGIC</div>
        <div class="row grow">
          <editor 
            class="input grow col" 
            v-model="input"
            outline
            autofocus
          ></editor>
          <editor 
            class="output grow col" 
            outline
            :value="output"
            readonly
          ></editor>
        </div>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { parse } from '@/parser';
import Editor from '@/components/Editor.vue';

@Component({ components: { Editor } })
export default class App extends Vue {
  public input = '';
  public output = '';

  public mounted() {
    window.addEventListener('keydown', this.parse);
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
}
</script>

<style lang="sass">
*
  font-family: monospace
  
body
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: left
  color: #2c3e50
  background: #eaf1ff
  height: 100vh

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
