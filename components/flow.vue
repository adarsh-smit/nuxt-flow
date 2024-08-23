<script setup>
import { ref } from 'vue'
import { Panel, VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'


const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1' },
  }
])
const { addNodes } = useVueFlow()

function generateRandomNode() {
  return {
    id: Math.random().toString(),
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
  useState("nodeClickData", () => e)
  // console.log("node clicked:", e)
}

const rightSlide = ref(null);

const showSlide = () => {
  if (rightSlide.value) {
    rightSlide.value.openSlide();
  }
};

</script>

<template>
    <RightSlide ref="rightSlide"></RightSlide>
    <VueFlow :nodes="initialNodes" @node-click="handleNodeClick">
      <Background  variant="dots" />
      <Controls />
      <Panel>
        <button type="button" @click="onAddNode">Add a node</button>
        <button type="button" @click="onAddNodes">Add multiple nodes</button>
      </Panel>
      
    </VueFlow>

</template>