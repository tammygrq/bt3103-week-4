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
        <ul class="withBorders">
            <li class="withBorders2" v-for="menu in orders" v-bind:key="menu">
                <ul>
                    <li v-for="item in menu" v-bind:key="item">
                        <span>{{item.name}}: {{item.quantity}}</span>
                    </li>
                </ul>
                <br>
                <button v-bind:id="menu.id" v-on:click="deleteItem($event)">Delete</button>
                <button v-bind:id="menu.id" v-on:click="route($event)">Modify</button>
            </li>
        </ul>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    components: {},
    data() {
        return {
            orders: []
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('order').get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data().order
                    item.id = doc.id
                    this.orders.push(item)
                })
            })
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database.collection('order').doc(doc_id).delete().then(() => {
                location.reload()
            });
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({
                name: 'modify',
                params: { id: doc_id }
            })
        }
    },
    created() {
        this.fetchItems()
    }
}
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

ul {
    list-style-type: none;
}

li {
    text-align: center;
}

button {
    width: 65px;
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
}
</style>