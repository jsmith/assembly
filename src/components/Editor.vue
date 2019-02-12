<template>
  <textarea 
    class="editor"
    :value="input" 
    ref="input" 
    :readonly="editable"
    @input="$emit('input', $event)"
  ></textarea>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class NAME extends Vue {
  @Prop(Boolean) public editable!: boolean;
  @Prop({ type: String, required: true }) public value!: string;
}
</script>

<style lang="sass" scoped>
.editor
  border-radius: 10px
  border: none
  padding: 5px
</style>