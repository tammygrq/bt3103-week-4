<template>
    <div class="chart">
        <h1 id="header">Line Graph</h1>
        <Chart></Chart>
    </div>
</template>

<script>
import Chart from "./CallAPI.js";
export default {
    components: {
        Chart
    }
};
</script>

<style scoped>
#header {
    background-color: #7B8CBD;
    font-family: Optima;
    color: white;
    font-size: 70px;
    text-align: center
}
</style>