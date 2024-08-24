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

@import '@vue-flow/controls/dist/style.css';



.dnd-flow {
  flex-direction: column;
  display: flex;
  height: 100%
}

.dnd-flow aside {
  color: #fff;
  font-weight: 700;
  border-right: 1px solid #eee;
  padding: 15px 10px;
  font-size: 12px;
  background: #10b981bf;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, .3);
  box-shadow: 0 5px 10px #0000004d
}

.dnd-flow aside .nodes>* {
  margin-bottom: 10px;
  cursor: grab;
  font-weight: 500;
  -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, .25);
  box-shadow: 5px 5px 10px 2px #00000040
}

.dnd-flow aside .description {
  margin-bottom: 10px
}

.dnd-flow .vue-flow-wrapper {
  flex-grow: 1;
  height: 100%
}

@media screen and (min-width: 640px) {
  .dnd-flow {
    flex-direction: row
  }

  .dnd-flow aside {
    min-width: 25%
  }


}

@media screen and (max-width: 639px) {
  .dnd-flow aside .nodes {
    display: flex;
    flex-direction: row;
    gap: 5px
  }
}
</style>
