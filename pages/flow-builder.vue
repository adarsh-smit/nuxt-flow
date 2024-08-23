<template>
  <div class="container">
    <ClientOnly>
    <div class="sidebar">Sidebar (25%)
      <div v-for="row in rows" :key="row" class="row">
        <div v-for="box in boxesPerRow" :key="box" class="box">
          <p>{{ text[row - 1][box - 1] }}</p>
        </div>
      </div>
    </div>
      <div class="content">Content (75%)
        <Flow />
      </div>
      <button class="floating-button" @click="handleClick">Complete Journey</button>
    </ClientOnly>
    </div>
</template>

<script setup>
const rows = [1, 2, 3]; // Number of rows
const boxesPerRow = [1, 2, 3]; // Number of boxes per row
const text = [["add trigger", "add node", "c"], ["a", "b", "c"], ["a", "b", "c"]]

const handleClick = () => {
  alert('Floating button clicked!');
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
}

.sidebar {
  width: 25%;
  height: 100;
  /* background-color: #f0f0f0; */
}

.content {
  width: 75%;
  padding-bottom: 25px;
  /* background-color: #ffffff; */
}

.row {
  display: flex;
  margin-bottom: 10px;
}

.box {
  flex: 1;
  margin: 0 5px;
  background-color: #85bae5;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  cursor: pointer;
}

.box:hover {
  background-color: #0056b3;
}

.floating-button {
  position: fixed;
  /* Fixed position for the button */
  bottom: 20px;
  /* Distance from the bottom of the viewport */
  right: 20px;
  /* Distance from the right of the viewport */
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 80%;
  width: 100px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 16px;
}

.floating-button:hover {
  background-color: #0056b3;
}
</style>