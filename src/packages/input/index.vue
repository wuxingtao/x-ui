<template>
  $END$
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'x-input',
  props: {},
  setup() {
    const state: any = reactive({})
    return { ...toRefs(state) }
  }
})
</script>

<style scoped></style>
