<script setup>
import { ref } from 'vue'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'


// Define props to receive data from the parent
const props = defineProps({
  message: Array,
  updateChild: Function
});

// Define emit to create custom events
const emit = defineEmits(['notify-parent']);


// Call the parent's update method (if necessary)
const callParentMethod = () => {
  props.updateChild([]);
};

const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: {},
    label: "Random Node1"
  }
])
const { addNodes, toObject, fromObject } = useVueFlow()

function generateRandomNode() {
  return {
    id: Math.random() * 1000,
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    label: 'Random Node',
  }
}

function onAddNode() {
  // add a single node to the graph
  addNodes(generateRandomNode())
}

function onAddNodes() {
  // add multiple nodes to the graph
  addNodes(Array.from({ length: 10 }, generateRandomNode))
}

function handleNodeClick(e) {
  showSlide()
  useState("nodeClickData").value = e.node
  // console.log("node clicked:", e)
}

const rightSlide = ref(null);

const showSlide = () => {
  if (rightSlide.value) {
    rightSlide.value.openSlide();
  }
};

//save load
const saveDiagram = (loc) => {
  const saveData = toObject()
  console.log(saveData);
  // Store the diagram data in localStorage or any other storage solution
  localStorage.setItem(loc, JSON.stringify(saveData));
};


// Function to load the diagram state
const loadDiagram = (loc) => {
  const flow = JSON.parse(localStorage.getItem(loc))

  if (flow) {
    fromObject(flow)
  }
};


watch(() => props.message, (val) => {
  if(val.length>0) {
    if (val[0]=="save") {
      saveDiagram(val[1])
    } else if (val[0]=="load") {
      loadDiagram(val[1])
    }
  }
}, {deep: true})
</script>

<template>
  <RightSlide ref="rightSlide"></RightSlide>
  <VueFlow :nodes="initialNodes" @node-click="handleNodeClick">
    <Background variant="dots" />
    <Controls />
    <Panel>
      <button type="button" @click="onAddNode">Add a node</button>
      <!-- <button type="button" @click="onAddNodes">Add multiple nodes</button> -->
    </Panel>

  </VueFlow>

</template>