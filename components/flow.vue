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
const { addNodes, toObject, fromObject } = useVueFlow()

function generateRandomNode() {
  return {
    id: Math.random() * 1000,
    position: { x: Math.random() * 500, y: Math.random() * 500 },
    label: 'Random Node',
  }
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
  <RightSlide ref="rightSlide"></RightSlide>
  <!-- <VueFlow :nodes="initialNodes" @node-click="handleNodeClick">
    <Background variant="dots" />
    <Controls />
    <Panel>
      <button type="button" @click="onAddNode">Add a node</button>
    </Panel>
  </VueFlow> -->
  <div class="dnd-flow" @drop="onDrop">
    <VueFlow :nodes="nodes" :edges="edges" @dragover="onDragOver" @dragleave="onDragLeave" @node-click="handleNodeClick" fit-view-on-init>
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
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
