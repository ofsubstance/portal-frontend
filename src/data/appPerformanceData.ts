import { ChartData } from '../components/charts/ChartTypes';

// Monthly Active Users (MAU) data
export const mauData: ChartData = {
  title: 'Monthly Active Users (MAU)',
  xAxis: {
    type: 'category',
    data: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Users',
  },
  series: [
    {
      name: 'MAU',
      type: 'line',
      data: [
        12500, 13200, 14800, 16500, 18200, 21000, 23500, 25800, 28000, 30200,
        32500, 35000,
      ],
      smooth: true,
      areaStyle: {},
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
};

// Daily Active Users (DAU) data
export const dauData: ChartData = {
  title: 'Daily Active Users (DAU)',
  xAxis: {
    type: 'category',
    data: [
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
      'Sun',
    ],
    name: 'Day',
  },
  yAxis: {
    type: 'value',
    name: 'Users',
  },
  series: [
    {
      name: 'DAU',
      type: 'line',
      data: [
        5200, 5400, 5800, 6100, 6500, 4800, 4200, 5300, 5600, 5900, 6300, 6700,
        5000, 4500,
      ],
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
  },
};

// User Growth Rate data
export const userGrowthRateData: ChartData = {
  title: 'User Growth Rate',
  xAxis: {
    type: 'category',
    data: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Growth Rate (%)',
  },
  series: [
    {
      name: 'Growth Rate',
      type: 'bar',
      data: [5.6, 5.3, 12.1, 11.5, 10.3, 15.4, 11.9, 9.8, 8.5, 7.9, 7.6, 7.7],
    },
  ],
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c}%',
  },
};

// User Engagement Rate data
export const userEngagementRateData: ChartData = {
  title: 'User Engagement Rate',
  xAxis: {
    type: 'category',
    data: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Engagement Rate (%)',
  },
  series: [
    {
      name: 'Engagement Rate',
      type: 'line',
      data: [42, 45, 48, 51, 54, 58, 62, 65, 68, 70, 72, 75],
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c}%',
  },
};

// User Retention Rate data
export const userRetentionRateData: ChartData = {
  title: 'User Retention Rate',
  xAxis: {
    type: 'category',
    data: [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4',
      'Week 5',
      'Week 6',
      'Week 7',
      'Week 8',
    ],
    name: 'Week',
  },
  yAxis: {
    type: 'value',
    name: 'Retention Rate (%)',
  },
  series: [
    {
      name: 'Retention Rate',
      type: 'line',
      data: [100, 65, 52, 45, 40, 38, 36, 35],
      smooth: true,
    },
  ],
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c}%',
  },
};

// Average Session Duration data
export const avgSessionDurationData: ChartData = {
  title: 'Average Session Duration',
  xAxis: {
    type: 'category',
    data: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    name: 'Month',
  },
  yAxis: {
    type: 'value',
    name: 'Duration (minutes)',
  },
  series: [
    {
      name: 'Session Duration',
      type: 'bar',
      data: [8.2, 8.5, 9.1, 9.4, 9.8, 10.2, 10.5, 10.8, 11.2, 11.5, 11.8, 12.1],
    },
  ],
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c} min',
  },
};

// Summary metrics
export const summaryMetrics = [
  {
    title: 'Monthly Active Users',
    value: '35,000',
    change: '+7.7%',
    changeType: 'positive',
  },
  {
    title: 'Daily Active Users',
    value: '6,700',
    change: '+6.3%',
    changeType: 'positive',
  },
  {
    title: 'User Growth Rate',
    value: '-7.7%',
    change: '-0.1%',
    changeType: 'negative',
  },
  {
    title: 'User Engagement Rate',
    value: '75%',
    change: '+4.2%',
    changeType: 'positive',
  },
  {
    title: 'User Retention Rate',
    value: '35%',
    change: '-2.8%',
    changeType: 'negative',
  },
  {
    title: 'Avg. Session Duration',
    value: '12.1 min',
    change: '+2.5%',
    changeType: 'positive',
  },
];
