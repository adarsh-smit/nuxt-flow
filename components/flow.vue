<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Controls } from '@vue-flow/controls'
import DropzoneBackground from '~/components/flow/DropzoneBackground.vue'
import Sidebar from '~/components/flow/Sidebar.vue'
import useDragAndDrop from '~/flow/useDnD'


// Define props to receive data from the parent
const props = defineProps({
  message: Array,
  updateChild: Function
});

// Define emit to create custom events
// const emit = defineEmits(['notify-parent']);


// Call the parent's update method (if necessary)
// const callParentMethod = () => {
//   props.updateChild([]);
// };

const { onConnect, addEdges } = useVueFlow()

const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop()


onConnect(addEdges)

const nodes = ref([])
const edges = ref([])
const initialNodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: {},
    label: "Random Node1"
  }
])
const { addNodes, toObject, fromObject, removeNodes, removeEdges } = useVueFlow()

function generateRandomNode() {
  return {
    id: Math.random() * 1000,
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    label: 'Random Node',
  }
}

function handleNodeClick(e) {
  // console.log(e);

  showSlide()
  useState("nodeClickData").value = e.node === undefined ? {modelType:"edge", ...e.edge}: {modelType:"node", ...e.node}
  // console.log("node clicked:", e)
}

const rightSlide = ref(null);

const showSlide = () => {
  if (rightSlide.value) {
    rightSlide.value.openSlide();
  }
};


//delete nodes and edges
const nodeDelete = (e) => {
  removeNodes(e, true, false)
}
const edgeDelete = (e) => {
  removeEdges(e)
}


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
  if (val.length > 0) {
    if (val[0] == "save") {
      saveDiagram(val[1])
    } else if (val[0] == "load") {
      loadDiagram(val[1])
    }
  }
}, { deep: true })
</script>

<template>
  <RightSlide ref="rightSlide" @nodeDelete="nodeDelete" @edgeDelete="edgeDelete"></RightSlide>
  <!-- <VueFlow :nodes="initialNodes" @node-click="handleNodeClick">
    <Background variant="dots" />
    <Controls />
    <Panel>
      <button type="button" @click="onAddNode">Add a node</button>
    </Panel>
  </VueFlow> -->
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave"
    @node-click="handleNodeClick"
    @edge-click="handleNodeClick"
    fit-view-on-init 
    :connection-radius="30" 
    auto-connect :default-edge-options="{ type: 'smoothstep', animated: true }">
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#2b465e' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      >
        <p v-if="isDragOver">Drop here</p>
      </DropzoneBackground>
      <Controls />
    </VueFlow>

    <Sidebar />
  </div>

</template>

<style lang="css" scoped>

</style>
