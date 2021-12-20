<template>
  <x-popover trigger="click" content="这是一段内容" style="margin-left:200px;">
    <template #reference>
      <x-button v-bind="buttonArgs">按钮测试</x-button>
    </template>
  </x-popover>


</template>

<script>
// import "@/packages/popover/index.scss";

export default {
  name: "Input-test"
};
</script>

<style lang="scss" scoped></style>
