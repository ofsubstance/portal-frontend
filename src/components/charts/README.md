# Chart Components

This directory contains reusable chart components built with ECharts and echarts-for-react.

## Components

### ChartCard

A wrapper component that displays a chart with an optional title, description, and loading state.

```tsx
<ChartCard
  title="Monthly Revenue"
  description="Revenue over the last 6 months"
  chartData={chartData}
  height={300}
  loading={false}
  className="custom-class"
  onEvents={{
    click: (params) => console.log('Chart clicked', params),
  }}
/>
```

### ChartDemo

A demo component that showcases all available chart types.

## Chart Types

The following chart types are supported:

- Line Chart
- Multi-Line Chart
- Area Chart
- Stacked Area Chart
- Bar Chart
- Grouped Bar Chart
- Stacked Bar Chart
- Pie Chart
- Donut Chart
- Scatter Chart

## Usage

```tsx
import { ChartCard, lineChartExample } from 'components/charts';

const MyComponent = () => {
  return (
    <ChartCard title="Revenue" chartData={lineChartExample} height={300} />
  );
};
```

## Creating Custom Chart Data

You can create custom chart data by following the `ChartData` interface:

```tsx
import { ChartData } from 'components/charts';

const myCustomChart: ChartData = {
  title: 'Custom Chart',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Value',
  },
  series: [
    {
      name: 'Series 1',
      type: 'line', // 'line', 'bar', 'pie', 'scatter', 'area'
      data: [100, 200, 300, 400, 500, 600],
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    show: true,
    position: 'top',
  },
};
```

## Event Handling

You can handle chart events using the `onEvents` prop:

```tsx
<ChartCard
  chartData={chartData}
  onEvents={{
    click: (params) => console.log('Chart clicked', params),
    legendselectchanged: (params) =>
      console.log('Legend selection changed', params),
  }}
/>
```
