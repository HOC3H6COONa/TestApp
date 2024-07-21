<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Table from './components/Table.vue'
</script>

<template>
    <div class="container">
        <Table/>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    margin: 10vh;
    align-items: center;
    height: 100vh;

}
</style>
