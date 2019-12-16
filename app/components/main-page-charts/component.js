import Component from '@glimmer/component';

export default class MainPageChartsComponent extends Component {
  pieChartOptions = {
    legend: {
      position: 'left'
    }
  };

  lineChartOptions = {
    legend: {
      position: 'left'
    }
  };
}
