<template>
    <div>
        <button id="button" v-on:click="decreaseOne">-</button>
        <span id="demo">{{ counter }}</span>
        <button id="button" v-on:click="increaseOne">+</button>
    </div>
</template>

<script>
export default {
    name: "QuantityCounter",
    methods: {
        increaseOne: function() {
            if (this.counter >= 10) {
                alert("You cannot buy more than 10 items.");
            } else {
                this.counter++;
            }
            this.$emit('counter', this.item, this.counter);
        },
        decreaseOne: function() {
            if (this.counter > 0) {
                this.counter--;
            }
            this.$emit('counter', this.item, this.counter);
        }
    },
    data() {
        return {
            counter: 0
        }
    },
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style scoped>
#demo {
    font-size: 30px;
    padding: 12px;
    vertical-align: middle;
}

#button {
    background-color: #B899AB;
    padding: 5px;
    border: 1px solid black;
    border-radius: 4px;
    width: 35px;
    height: 35px;
    font-size: 20px
}
</style>