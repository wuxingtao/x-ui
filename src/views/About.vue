<template>
  <div class="about">
    <x-button>button按钮</x-button>
    <x-input></x-input>
  </div>
</template>
<script>
export default {
  name: 'about',
  setup() {
    const text = 'hello about'
    return { text }
  }
}
</script>
