import { ChartData } from './ChartTypes';

// Line Chart Example
export const lineChartExample: ChartData = {
  title: 'Monthly Revenue',
  subtitle: 'Last 6 months',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Revenue ($)',
  },
  series: [
    {
      name: 'Revenue',
      type: 'line',
      data: [5000, 7000, 6000, 9000, 8500, 12000],
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

// Multi-Line Chart Example
export const multiLineChartExample: ChartData = {
  title: 'Platform Performance',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Count',
  },
  series: [
    {
      name: 'Users',
      type: 'line',
      data: [1200, 1350, 1800, 2100, 2500, 2800],
      smooth: true,
    },
    {
      name: 'Sessions',
      type: 'line',
      data: [2800, 3100, 3800, 4200, 4900, 5500],
      smooth: true,
    },
    {
      name: 'Page Views',
      type: 'line',
      data: [8500, 9200, 11000, 12500, 14000, 15500],
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

// Area Chart Example
export const areaChartExample: ChartData = {
  title: 'User Growth',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Users',
  },
  series: [
    {
      name: 'Total Users',
      type: 'area',
      data: [1500, 2500, 3500, 4800, 6000, 7500],
      areaStyle: {},
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
};

// Stacked Area Chart Example
export const stackedAreaChartExample: ChartData = {
  title: 'Content Engagement',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Views',
  },
  series: [
    {
      name: 'Videos',
      type: 'area',
      stack: 'total',
      data: [2500, 3000, 3600, 4200, 5100, 5800],
      areaStyle: {},
    },
    {
      name: 'Articles',
      type: 'area',
      stack: 'total',
      data: [1800, 2000, 2300, 2900, 3200, 3800],
      areaStyle: {},
    },
    {
      name: 'Podcasts',
      type: 'area',
      stack: 'total',
      data: [800, 1000, 1200, 1500, 1700, 2000],
      areaStyle: {},
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

// Bar Chart Example
export const barChartExample: ChartData = {
  title: 'Monthly Revenue by Category',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Revenue ($)',
  },
  series: [
    {
      name: 'Revenue',
      type: 'bar',
      data: [5000, 7000, 6000, 9000, 8500, 12000],
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
};

// Grouped Bar Chart Example
export const groupedBarChartExample: ChartData = {
  title: 'Revenue by Product Category',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Revenue ($)',
  },
  series: [
    {
      name: 'Product A',
      type: 'bar',
      data: [2500, 3500, 3000, 4500, 4200, 6000],
    },
    {
      name: 'Product B',
      type: 'bar',
      data: [1500, 2000, 1800, 2500, 2300, 3500],
    },
    {
      name: 'Product C',
      type: 'bar',
      data: [1000, 1500, 1200, 2000, 2000, 2500],
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

// Stacked Bar Chart Example
export const stackedBarChartExample: ChartData = {
  title: 'Revenue Breakdown',
  xAxis: {
    type: 'category',
    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Revenue ($)',
  },
  series: [
    {
      name: 'Subscriptions',
      type: 'bar',
      stack: 'total',
      data: [2500, 3500, 3000, 4500, 4200, 6000],
    },
    {
      name: 'One-time Purchases',
      type: 'bar',
      stack: 'total',
      data: [1500, 2000, 1800, 2500, 2300, 3500],
    },
    {
      name: 'Advertising',
      type: 'bar',
      stack: 'total',
      data: [1000, 1500, 1200, 2000, 2000, 2500],
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

// Pie Chart Example
export const pieChartExample: ChartData = {
  title: 'Revenue by Source',
  series: [
    {
      name: 'Revenue Source',
      type: 'pie',
      radius: '60%',
      data: [
        { name: 'Subscriptions', value: 45 },
        { name: 'One-time Purchases', value: 25 },
        { name: 'Advertising', value: 15 },
        { name: 'Partnerships', value: 10 },
        { name: 'Other', value: 5 },
      ],
    },
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    show: true,
    position: 'bottom',
    orient: 'horizontal',
  },
};

// Donut Chart Example
export const donutChartExample: ChartData = {
  title: 'User Device Distribution',
  series: [
    {
      name: 'Device Type',
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { name: 'Mobile', value: 55 },
        { name: 'Desktop', value: 30 },
        { name: 'Tablet', value: 12 },
        { name: 'Other', value: 3 },
      ],
    },
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)',
  },
  legend: {
    show: true,
    position: 'bottom',
    orient: 'horizontal',
  },
};

// Scatter Chart Example
export const scatterChartExample: ChartData = {
  title: 'Video Length vs. Engagement',
  xAxis: {
    type: 'value',
    name: 'Video Length (minutes)',
  },
  yAxis: {
    type: 'value',
    name: 'Engagement Score',
  },
  series: [
    {
      name: 'Videos',
      type: 'scatter',
      data: [
        { name: 'Video 1', value: 3.5 },
        { name: 'Video 2', value: 4.1 },
        { name: 'Video 3', value: 4.3 },
        { name: 'Video 4', value: 4.0 },
        { name: 'Video 5', value: 3.8 },
        { name: 'Video 6', value: 3.5 },
        { name: 'Video 7', value: 3.2 },
        { name: 'Video 8', value: 3.3 },
        { name: 'Video 9', value: 3.9 },
        { name: 'Video 10', value: 4.2 },
        { name: 'Video 11', value: 3.9 },
        { name: 'Video 12', value: 3.7 },
        { name: 'Video 13', value: 3.1 },
        { name: 'Video 14', value: 3.7 },
        { name: 'Video 15', value: 4.0 },
      ],
    },
  ],
  tooltip: {
    trigger: 'item',
    formatter: 'Video: {b}<br/>Score: {c}',
  },
};
