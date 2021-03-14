<template>
    <div>
        <p id="menu">Menu:</p>
        <ul>
            <li v-for="order in itemsSelected" v-bind:key="order">
                {{order[0]}} x{{order[1]}}
            </li>
        </ul>
        <button id="button" v-on:click="findTotal(); sendOrder()">Add Order</button>
        <p id="prices" v-show="show">Subtotal: ${{subTotal}} </p>
        <p id="prices" v-show="show">Grand Total: ${{grandTotal.toFixed(2)}}</p>
    </div>
</template>

<script>
import database from '../firebase.js'
export default {
    props: {
        itemsSelected: {
            type: Array
        }
    },
    data() {
        return {
            subTotal: 0,
            grandTotal: 0,
            show: false,
            orders: [],
            itemNames: []
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('menu').get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data()
                    this.itemNames.push(item)
                })
            })
        },
        findTotal: function() {
            this.show = true;
            this.subTotal = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.subTotal += this.itemsSelected[i][2] * this.itemsSelected[i][1];
            }
            return this.subTotal;
        },
        sendOrder: function() {
            for (let i = 0; i < this.itemNames.length; i++) {
                let item = {};
                item.name = this.itemNames[i].name;
                item.quantity = 0;
                this.orders.push(item);
            }

            for (let i = 0; i < this.itemsSelected.length; i++) {
                for (let k = 0; k < this.itemNames.length; k++) {
                    if (this.itemsSelected[i][0] === this.orders[k].name) {
                        this.orders[k].quantity = this.itemsSelected[i][1];
                    }
                }
            }
            database.collection('order').add({
                order: this.orders
            }).then(() => { location.reload() });

        }
    },
    created() {
        this.fetchItems()
    },

    watch: {
        subTotal: function() {
            this.grandTotal = (this.subTotal * 1.07);
        }
    }
}
</script>

<style scoped>
#prices {
    font-size: 18px;
}

#menu {
    font-size: 18px;
}

#button {
    font-size: 16px;
    border-radius: 8px;
    background-color: #B899AB;
    padding: 5px;
    border: 1px solid black;
}

li {
    font-size: 18px;
    margin-bottom: 18px;
}
</style>