/* eslint-disable @typescript-eslint/no-explicit-any */
import { EChartsOption, EChartsReactProps } from 'echarts-for-react';
import {
  BarSeriesOption,
  LineSeriesOption,
  PieSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts';

export type ChartType = 'line' | 'bar' | 'pie' | 'scatter' | 'area' | 'sankey';

export interface ChartDataPoint {
  name: string;
  value: number;
}

export interface ChartSeries {
  name: string;
  data: ChartDataPoint[] | number[] | any[];
  type: ChartType;
  stack?: string;
  areaStyle?: Record<string, unknown>;
  smooth?: boolean;
  itemStyle?: Record<string, unknown>;
  emphasis?: Record<string, unknown>;
  radius?: string | string[];
  center?: string[];
  links?: any[];
  lineStyle?: Record<string, unknown>;
}

export interface ChartData {
  title?: string;
  subtitle?: string;
  xAxis?: {
    type: 'category' | 'value' | 'time';
    data?: string[];
    name?: string;
  };
  yAxis?: {
    type: 'category' | 'value';
    name?: string;
  };
  series: ChartSeries[];
  legend?: {
    show?: boolean;
    orient?: 'horizontal' | 'vertical';
    position?: 'top' | 'bottom' | 'left' | 'right';
  };
  tooltip?: {
    show?: boolean;
    trigger?: 'item' | 'axis';
    formatter?: string;
  };
  grid?: {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
    containLabel?: boolean;
  };
  color?: string[];
}

export interface ChartCardProps {
  title?: string;
  description?: string;
  chartData: ChartData;
  height?: number | string;
  loading?: boolean;
  className?: string;
  onEvents?: EChartsReactProps['onEvents'];
}

export const defaultColors = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
];

export const generateChartOptions = (chartData: ChartData): EChartsOption => {
  const {
    title,
    subtitle,
    xAxis,
    yAxis,
    series,
    legend,
    tooltip,
    grid,
    color = defaultColors,
  } = chartData;

  return {
    color,
    title:
      title || subtitle
        ? {
            text: title,
            subtext: subtitle,
            left: 'center',
            textStyle: {
              fontWeight: 'normal',
            },
          }
        : undefined,
    tooltip: {
      trigger: tooltip?.trigger || 'axis',
      ...tooltip,
    },
    legend: {
      show: legend?.show !== false,
      orient: legend?.orient || 'horizontal',
      top: legend?.position === 'top' ? 0 : undefined,
      bottom: legend?.position === 'bottom' ? 0 : undefined,
      left: legend?.position === 'left' ? 0 : undefined,
      right: legend?.position === 'right' ? 0 : undefined,
    },
    grid: {
      top: grid?.top || 50,
      right: grid?.right || 20,
      bottom: grid?.bottom || 40,
      left: grid?.left || 60,
      containLabel: grid?.containLabel !== false,
    },
    xAxis: xAxis
      ? {
          type: xAxis.type || 'category',
          ...(xAxis.data ? { data: xAxis.data } : {}),
          name: xAxis.name,
          nameLocation: 'middle',
          nameGap: 30,
          axisLabel: {
            rotate: 0,
          },
        }
      : undefined,
    yAxis: yAxis
      ? {
          type: yAxis.type || 'value',
          name: yAxis.name,
          nameLocation: 'middle',
          nameGap: 50,
        }
      : undefined,
    series: series.map((s) => {
      // Handle each chart type with proper typing
      if (s.type === 'pie') {
        const pieConfig: PieSeriesOption = {
          type: 'pie',
          name: s.name,
          data: s.data,
          radius: s.radius || '60%',
          center: s.center || ['50%', '50%'],
          emphasis: (s.emphasis as any) || {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          itemStyle: s.itemStyle as any,
        };
        return pieConfig;
      }

      if (s.type === 'line' || s.type === 'area') {
        const lineConfig: LineSeriesOption = {
          type: 'line',
          name: s.name,
          data: s.data,
          stack: s.stack,
          smooth: s.type === 'area' ? s.smooth !== false : s.smooth,
          itemStyle: s.itemStyle as any,
          emphasis: s.emphasis as any,
        };

        // Add area style for area charts
        if (s.type === 'area') {
          lineConfig.areaStyle = (s.areaStyle as any) || {};
        }

        return lineConfig;
      }

      if (s.type === 'bar') {
        const barConfig: BarSeriesOption = {
          type: 'bar',
          name: s.name,
          data: s.data,
          stack: s.stack,
          itemStyle: s.itemStyle as any,
          emphasis: s.emphasis as any,
        };
        return barConfig;
      }

      if (s.type === 'scatter') {
        const scatterConfig: ScatterSeriesOption = {
          type: 'scatter',
          name: s.name,
          data: s.data,
          itemStyle: s.itemStyle as any,
          emphasis: s.emphasis as any,
        };
        return scatterConfig;
      }

      if (s.type === 'sankey') {
        return {
          type: 'sankey',
          name: s.name,
          data: s.data,
          links: s.links,
          emphasis: s.emphasis as any,
          lineStyle: s.lineStyle as any,
          itemStyle: s.itemStyle as any,
          label: {
            formatter: '{b}',
            position: 'right',
          },
        };
      }

      // Fallback for any other types
      return {
        type: s.type,
        name: s.name,
        data: s.data,
      } as any;
    }),
  };
};
