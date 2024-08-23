
<script setup>
import { ref, onMounted } from 'vue'
import { VueFlow } from '@vue-flow/core'

const nodes = ref([
  {
    id: '1',
    position: { x: 50, y: 50 },
    data: { label: 'Node 1', },
  },
  {
    id: '2',
    position: { x: 50, y: 250 },
    data: { label: 'Node 2', },
  }
]);

const edges = ref([
  {
    id: 'e1->2',
    source: '1',
    target: '2',
  }
]);
</script>

<template>
  <VueFlow :nodes="nodes" :edges="edges" />
</template>