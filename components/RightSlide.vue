<template>
  <div :class="['slide', { 'slide-open': isOpen }]">
    <button class="close-btn" @click="closeSlide">Close</button>
    <div class="content">
      {{ nodeData }}
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);

const openSlide = () => {
  isOpen.value = true;
};

const closeSlide = () => {
  isOpen.value = false;
};

const nodeData = useState("nodeClickData")

defineExpose({
  openSlide
});
</script>

<style scoped>
.slide {
  position: fixed;
  top: 0;
  right: -30vw; /* Initially hidden outside the viewport */
  width: 30vw;
  height: 100vh;
  background-color: #333;
  color: white;
  transition: right 0.3s ease-in-out;
  overflow: auto;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
}

.slide-open {
  right: 0; /* Slide in */
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f44336;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
}

.content {
  padding: 20px;
}
</style>
