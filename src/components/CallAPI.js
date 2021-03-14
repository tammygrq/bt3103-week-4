import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                label: "",
                borderColor: "#B67D81",
                fill: false
            }, {
                data: [],
                label: "",
                borderColor: "#D6B600",
                fill: false
            }, {
                data: [],
                label: "",
                borderColor: "#B2C7A5",
                fill: false
            }, {
                data: [],
                label: "",
                borderColor: "#A5C6C7",
                fill: false
            }, {
                data: [],
                label: "",
                borderColor: "#7D97B6",
                fill: false
            }, {
                data: [],
                label: "",
                borderColor: "#B7A5C7",
                fill: false
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            for (let j = 0; j < response.data.region_metadata.length; j++) {
                this.datacollection.datasets[j].label = response.data.region_metadata[j].name
            }
            for (let i = 0; i < response.data.items.length; i++) {
                this.datacollection.labels.push(response.data.items[i].timestamp)
                this.datacollection.datasets[0].data.push(response.data.items[i].readings.psi_twenty_four_hourly.west)
                this.datacollection.datasets[1].data.push(response.data.items[i].readings.psi_twenty_four_hourly.national)
                this.datacollection.datasets[2].data.push(response.data.items[i].readings.psi_twenty_four_hourly.east)
                this.datacollection.datasets[3].data.push(response.data.items[i].readings.psi_twenty_four_hourly.central)
                this.datacollection.datasets[4].data.push(response.data.items[i].readings.psi_twenty_four_hourly.south)
                this.datacollection.datasets[5].data.push(response.data.items[i].readings.psi_twenty_four_hourly.north)
            }
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