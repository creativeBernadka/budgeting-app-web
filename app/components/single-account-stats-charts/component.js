import Component from '@glimmer/component';

export default class SingleAccountStatsChartsComponent extends Component {
  barChartOptions = {
    legend: {
      display: false
    }
  };

  pieChartOptions = {
    legend: {
      position: 'left'
    }
  };
}
