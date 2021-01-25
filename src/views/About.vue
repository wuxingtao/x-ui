<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>{{ text }}</p>
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
