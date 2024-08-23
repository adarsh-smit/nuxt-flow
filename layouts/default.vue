<template>
  <div class="container">
    <div class="header">
      <ClientOnly >
        <ColorModePicker />
      </ClientOnly>
    </div>
    <div class="main">
      <NuxtPage />
    </div>
  </div>

</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header {
  height: 10vh;
  /* background-color: #f0f0f0; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  height: 90vh;
  /* background-color: #ffffff; */
  /* display: flex; */
  /* align-items: center;
  justify-content: center; */
}
</style>

<style>
@import '~/assets/main.css';
/* import the necessary styles for Vue Flow to work */
@import '@vue-flow/core/dist/style.css';

/* import the default theme, this is optional but generally recommended */
@import '@vue-flow/core/dist/theme-default.css';

@import '@vue-flow/controls/dist/style.css'
</style>
