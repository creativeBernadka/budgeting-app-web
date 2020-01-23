import Component from '@glimmer/component';

export default class StatsPageChartsComponent extends Component {

  barChartOptions = {
    legend: {
      position: 'right'
    }
  };

  pieChartOptions = {
    legend: {
      position: 'left'
    }
  }
}
