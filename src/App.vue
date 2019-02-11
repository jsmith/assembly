<template>
  <div id="app" style="display: flex; flex-direction: column">
    <div class="banner">JACOBS TEXT MAGIC</div>
    <div class="row grow">
      <div class="relative grow col">
        <textarea class="input text" v-model="input" ref="input"></textarea>
      </div>
      <div class="output text grow col">{{ output }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { parse } from '@/parser';

@Component
export default class App extends Vue {
  public input = '';
  public output = '';

  public mounted() {
    window.addEventListener('keydown', this.parse);

    const input = this.$refs.input as HTMLElement;
    input.focus();
  }

  public destroyed() {
    window.removeEventListener('keydown', this.parse);
  }

  public parse(event: KeyboardEvent) {
    // 83 === s
    if (event.which !== 83 || !event.ctrlKey) { return; }
    event.preventDefault();

    try {
      this.output = parse(this.input);
    } catch (e) {
      this.output = e.message;
    }
  }
}
</script>

<style lang="sass">
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

.relative
  position: relative

// Use absolute so the textarea doesn't jump
// https://stackoverflow.com/questions/15475010/text-area-in-html-jumps-on-focus
.input
  top: 0
  bottom: 0
  width: 100%
  position: absolute

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

.button
	box-shadow:inset 0px 1px 0px 0px #ffffff
	background-color: #005dff
	border-radius: 6px
	text-indent: 0
	border: 1px solid #dcdcdc
	display: inline-block
	color: #EEE
	font-family: arial
	font-size: 15px
	font-weight: bold
	height: 50px
	line-height: 50px
	width: 100px
	text-decoration: none
	text-align: center

.button:hover
  cursor: pointer
  background-color: #dfdfdf

.row
  display: flex

.grow
  flex: 1

.text
  border-radius: 10px
  border: none
  padding: 5px

.col
  margin: 10px
</style>
