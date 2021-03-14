<template>
    <div id="itemsList">
        <ul>
            <li>
                <router-link to="/" exact>Home</router-link>
            </li>
            <li>
                <router-link to="/orders" exact>Orders</router-link>
            </li>
            <li class="withBorders2">
                <router-link to="/dashboard" exact>Dashboard</router-link>
            </li>
        </ul>
        <ul>
            <li v-for="item in items" v-bind:key="item">
                <div id="itemName">{{item.name}}</div>
                <img v-bind:src="item.imageURL" alt="food">
                <p id="price">${{item.price}}</p>
                <quantityCounter v-bind:item="item" v-on:counter="onCounter"></quantityCounter>
            </li>
        </ul>
        <basket id="shoppingBasket" v-bind:itemsSelected="itemsSelected"></basket>
    </div>
</template>

<script>
import database from '../firebase.js'
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
export default {
    data() {
        return {
            itemsSelected: [],
            items: []
        }
    },
    components: {
        'basket': Basket,
        'quantityCounter': QuantityCounter
    },
    methods: {
        onCounter: function(item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                // Loop through everything to check what is not in the basket
                for (var i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    if (item_name === item.name && count > 0) {
                        this.itemsSelected.splice(i, 1);
                        this.itemsSelected.splice(i, 0, [item.name, count, item.price]);
                        break;

                    } else if (item.name === item_name && count === 0) {
                        this.itemsSelected.splice(i, 1);
                        break;

                    } else if (item_name != item.name && i == (this.itemsSelected.length - 1)) {
                        this.itemsSelected.push([item.name, count, item.price]);
                    }
                }
            }
        },
        fetchItems: function() {
            database.collection('menu').get().then((querySnapShot) => {
                let item = {}
                querySnapShot.forEach(doc => {
                    item = doc.data()
                    item.show = false
                    this.items.push(item)
                })
            })
        }
    },

    created() {
        this.fetchItems()
    }
}
</script>

<style scoped>
#itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
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

img {
    width: 135px;
    height: 135px;
}

#price {
    font-size: 30px;
}

#itemName {
    font-size: 30px;
}

#shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
}
</style>