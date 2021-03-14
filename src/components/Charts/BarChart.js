import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Quantity",
                backgroundColor: ["#B7A5C7", "#C7A5B5", "#B2C7A5", "#A5C6C7", "#7D97B6", "#B67D81"],
                data: [0,0,0,0,0,0]
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('order').get().then((querySnapShot) => {
        let item = {}
        querySnapShot.forEach(doc => {
            item = doc.data().order
            for (let i = 0; i < item.length; i++) {
                this.datacollection.labels[i] = item[i].name
                this.datacollection.datasets[0].data[i] += item[i].quantity
            }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  mounted () {
    this.renderChart(this.datacollection, this.options)
  },
  created () {
    this.fetchItems()
  }
}