<template>
  <div class="editor">
    <v-textarea 
      class="textarea"
      :value="value"
      ref="input"
      @input="input"
      @keydown="keydown"
      v-bind="$attrs"
    ></v-textarea>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Editor extends Vue {
  @Prop({ type: String, required: true }) public value!: string;

  public input(text: string) {
    this.$emit('input', text);
  }

  public keydown(e: KeyboardEvent) {
    if (e.which === 9) {
      e.preventDefault();
      this.$emit('input', this.value + '    ');
    }
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