<template>
  <div :v-show="isOpen" :class="['slide', { 'slide-open': isOpen }]">
    <!-- <button class="close-btn" @click="closeSlide">Close</button> -->
    <div class="content">
      {{ nodeData?.data }}
      <div class="input-group">
        <label for="input1">Name:</label>
        <input id="name" type="text" v-model="name" />
      </div>
      <div class="input-group">
        <label for="input1">Label 1:</label>
        <input id="input1" type="text" v-model="input1" />
      </div>
      <div class="input-group">
        <label for="input2">Label 2:</label>
        <input id="input2" type="text" v-model="input2" />
      </div>
      <div class="input-group">
        <label for="input3">Label 3:</label>
        <input id="input3" type="text" v-model="input3" />
      </div>
      <div class="actions">
        <button class="action-btn save" @click="save">Save</button>
        <button class="action-btn cancel" @click="closeSlide">Cancel</button>
        <button class="action-btn delete" @click="deleteItem">Delete</button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits();

const isOpen = ref(false);

const nodeData = useState("nodeClickData")
let name = undefined;
let input1 = undefined;
let input2 = undefined;
let input3 = undefined;


// if (nodeData.value)
//   nodeData?.value?.data = customData

const openSlide = () => {
  // console.log("openslide", nodeData.value?.data?.l1);
  isOpen.value = true;
  updateValues()
};

const closeSlide = () => {
  isOpen.value = false;
};

const save = () => {
  // Add save logic here
  isOpen.value = false;
  nodeData.value.data = { label: name, l1: input1, l2: input2, l3: input3 }
};

const deleteItem = () => {
  // Add delete logic here
  // console.log(nodeData.value.modelType+"Delete", nodeData.value);
  isOpen.value = false;
  emit(nodeData.value.modelType+"Delete", nodeData.value)
};

const updateValues = () => {
  name = nodeData.value?.data?.label
  input1 = nodeData.value?.data?.l1
  input2 = nodeData.value?.data?.l2
  input3 = nodeData.value?.data?.l3
} 

const nodeDataData = computed(() => nodeData.value?.data);
watch(nodeDataData, (newValue, oldValue) => {
  // console.log('Value changed from', oldValue, 'to', newValue);
  updateValues()
}, {deep: true});

defineExpose({
  openSlide
});
</script>

<style scoped>
.slide {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: -30vw;
  /* Initially hidden outside the viewport */
  width: 30vw;
  height: 100vh;
  background-color: #333;
  color: white;
  transition: right 0.3s ease-in-out;
  overflow: auto;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
}

.slide-open {
  right: 0;
  /* Slide in */
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

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
}

.actions {
  margin-top: auto;
  /* Push buttons to the bottom */
  display: flex;
  justify-content: space-evenly;
}

.action-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  transition: background-color 0.3s;
}

.save {
  background-color: #4caf50;
  /* Green */
}

.save:hover {
  background-color: #45a049;
}

.cancel {
  background-color: #f0ad4e;
  /* Orange */
}

.cancel:hover {
  background-color: #ec971f;
}

.delete {
  background-color: #d9534f;
  /* Red */
}

.delete:hover {
  background-color: #c9302c;
}
</style>
