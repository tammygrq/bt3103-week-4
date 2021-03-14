<template>
    <div>
        <p v-for="(item,index) in datapacket" v-bind:key="index">
            {{item.name}}: {{item.quantity}} <br>
            <input id='index' placeholder=0 type='number' min=0 v-model="change[index]">
        </p>
        <button v-on:click="updateOrder()">Update order</button>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    components: {},
    data() {
        return {
            datapacket: [],
            change: []
        }
    },
    methods: {
        fetchItems: function() {
            let doc_id = this.$route.params.id;
            database.collection('order').doc(doc_id).get().then((querySnapShot) => {
                this.datapacket = (querySnapShot.data().order)
            })
        },
        updateOrder: function() {
            let copy = this.datapacket;
            for (let i = 0; i < this.change.length; i++) {
                if (this.change[i]) {
                    copy[i].quantity = this.change[i]
                }
            }
            database.collection("order").doc(this.$route.params.id).update({
                    order: copy
                })
                .then(() => {
                    this.$router.push('/orders')
                });
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>

<style scoped>
button {
    font-size: 18px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
}
</style>
