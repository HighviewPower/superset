import React from 'react';
import { SuperChart, getChartTransformPropsRegistry } from '@superset-ui/chart';
import { boolean, number, select, withKnobs } from '@storybook/addon-knobs';
import { EchartsTimeseriesChartPlugin } from '@superset-ui/plugin-chart-echarts';
import transformProps from '@superset-ui/plugin-chart-echarts/lib/Timeseries/transformProps';
import { withResizableChartDemo } from '../../../shared/components/ResizableChartDemo';
import data from './data';

new EchartsTimeseriesChartPlugin().configure({ key: 'echarts-timeseries' }).register();

getChartTransformPropsRegistry().registerValue('echarts-timeseries', transformProps);

export default {
  title: 'Chart Plugins|plugin-chart-echarts',
  decorators: [withKnobs, withResizableChartDemo],
};

export const Timeseries = ({ width, height }) => {
  const forecastEnabled = boolean('Enable forecast', true);
  const queryData = data
    .map(row =>
      forecastEnabled
        ? row
        : {
            __timestamp: row.__timestamp,
            Boston: row.Boston,
            California: row.California,
            WestTexNewMexico: row.WestTexNewMexico,
          },
    )
    .filter(row => forecastEnabled || !!row.Boston);
  return (
    <SuperChart
      chartType="echarts-timeseries"
      width={width}
      height={height}
      queryData={{ data: queryData }}
      formData={{
        contributionMode: undefined,
        forecastEnabled,
        colorScheme: 'supersetColors',
        seriesType: select(
          'Line type',
          ['line', 'scatter', 'smooth', 'bar', 'start', 'middle', 'end'],
          'line',
        ),
        logAxis: boolean('Log axis', false),
        yAxisFormat: 'SMART_NUMBER',
        stack: boolean('Stack', false),
        area: boolean('Area chart', false),
        markerEnabled: boolean('Enable markers', false),
        markerSize: number('Marker Size', 6),
        minorSplitLine: boolean('Minor splitline', false),
        opacity: number('Opacity', 0.2),
        zoomable: boolean('Zoomable', false),
      }}
    />
  );
};
