<template>
    <div>
        <ul class="withBorders">
            <li class="withBorders2">
                <router-link to="/" exact>Home</router-link>
            </li>
            <li class="withBorders2">
                <router-link to="/orders" exact>Orders</router-link>
            </li>
            <li class="withBorders2">
                <router-link to="/dashboard" exact>Dashboard</router-link>
            </li>
        </ul>
        <BarChart></BarChart>
        <LineGraph></LineGraph>
    </div>
</template>

<script>
import BarChart from './Charts/BarChart.vue'
import LineGraph from './CallAPI.vue'
export default {
    components: {
      BarChart,
      LineGraph
    }
};
</script>

<style scoped>
.withBorders {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}

.withBorders2 {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}

</style>