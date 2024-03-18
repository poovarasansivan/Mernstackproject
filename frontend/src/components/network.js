import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Maps from 'fusioncharts/fusioncharts.maps';
import World from 'fusioncharts/maps/fusioncharts.world';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Maps, World, FusionTheme);

const chartConfigs = {
  type: 'world',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: {/* see data tab */ },
};

class Chart extends Component {
  render () {
    return <ReactFC {...chartConfigs} />;
  }
}

ReactDOM.render(
  <Chart />,
  document.getElementById('root'),
);
