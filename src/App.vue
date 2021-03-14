<template>
    <div>
        <h1 id="header">Kimly's Zi Char</h1>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {

        }
    }
}
</script>

<style scoped>
#header {
    background-color: #7B8CBD;
    font-family: Optima;
    color: white;
    font-size: 50px;
    text-align: center
}
ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
}

li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
}

button {
    width: 65px;
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
}
</style>
