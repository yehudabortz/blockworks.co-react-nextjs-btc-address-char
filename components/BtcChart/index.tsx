import Highcharts, { Options, SeriesOptionsType } from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { abbreviateNumber } from "js-abbreviation-number";
import { FC, useMemo } from 'react';

import { TBitcoinBalanceChunk } from '../../types/bitcoinData';
import { BtcChartChunks } from '../../types/enums';

type Props = {
  data: TBitcoinBalanceChunk[];
};

const BtcChart: FC<Props> = ({ data }) => {
  console.log(data)

  const seriesData = useMemo(
    () =>
      [
        { name: [BtcChartChunks.Over1k], color: '#fa4d56' },
        { name: [BtcChartChunks.Over10k], color: '#6929c4' },
        { name: [BtcChartChunks.Over100k], color: '#002d9c' },
        { name: [BtcChartChunks.Over1M], color: '#f1c21b' },
        { name: [BtcChartChunks.Over10M], color: '#198038' },
      ].map(({ name, color }) => ({
        name,

        data: data[name],

        lineWidth: 2,
        color,
        type: 'line',
      })),
    [data],
  );

  const options: Options = {
    rangeSelector: {
      inputStyle: {
        color: '#6800ff',
        fontWeight: 'bold',
      },
    },
    legend: {
      enabled: true,
    },
    yAxis: {
      offset: 50,
    },
    xAxis: {
      max: new Date().getTime()
    },
    tooltip: {
      useHTML: true,
      // its important to use function () here in order to access the proper scope of 'this'
      formatter: function () {
        return this.points
          ?.map(
            (point) =>
              `<span style="color:${point?.color}">\u25CF</span> ${point?.series.name
              }: <b>${abbreviateNumber(point.y as number, 2)}</b><br/>`,
          )
          .join('');
      },
    },
    series: seriesData as SeriesOptionsType[],
  };
  return (
    <div className='min-h-[400px]'>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );
};

export default BtcChart;
