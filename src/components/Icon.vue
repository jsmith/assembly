<template>
  <v-tooltip 
    :right="right" 
    :left="left" 
    :top="top" 
    :bottom="bottom" 
    z-index="100"
  >
    <template slot="activator">
      <v-btn icon v-bind="$attrs" v-on="$listeners" class="button">
        <v-icon
          color="#003da7"
        >{{ icon }}</v-icon>
      </v-btn>
    </template>

    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
  @Prop({ type: String, required: true }) public tooltip!: string;
  @Prop({ type: String, required: true }) public icon!: string;
  @Prop({ type: Boolean, default: false }) public right!: boolean;
  @Prop({ type: Boolean, default: false }) public left!: boolean;
  @Prop({ type: Boolean, default: true }) public top!: boolean;
  @Prop({ type: Boolean, default: false }) public bottom!: boolean;
}
</script>

<style lang="sass" scoped>
.button
  & /deep/ .v-btn
    margin: 2px
</style>