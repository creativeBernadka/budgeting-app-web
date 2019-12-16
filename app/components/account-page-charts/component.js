import Component from '@glimmer/component';

export default class AccountPageChartsComponent extends Component {

  chartOptions = {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        display: true,
        stacked: true,
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
}
