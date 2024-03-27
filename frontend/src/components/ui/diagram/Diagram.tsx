// @ts-ignore
import { useTranslation } from 'react-i18next';
import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';

const Diagram = ({ zoneCount }: any) => {
  const { t } = useTranslation('translation');

  const chartRef = useRef<any>(null);
  const chartInstance = useRef<any>(null);

  const [west, setWest] = useState(zoneCount.westCount);
  const [east, setEast] = useState(zoneCount.eastCount);
  const [north, setNorth] = useState(zoneCount.northCount);
  const [south, setSouth] = useState(zoneCount.southCount);
  const [center, setCenter] = useState(zoneCount.centerCount);

  useEffect(() => {
    // Update state variables when zoneCount changes
    setWest(zoneCount.westCount);
    setEast(zoneCount.eastCount);
    setNorth(zoneCount.northCount);
    setSouth(zoneCount.southCount);
    setCenter(zoneCount.centerCount);
  }, [zoneCount]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext('2d');

    if (
      west !== undefined &&
      east !== undefined &&
      north !== undefined &&
      south !== undefined &&
      center !== undefined
    ) {
      chartInstance.current = new Chart(myChartRef, {
        type: 'pie',
        data: {
          labels: [
            t('search.zone.east'),
            t('search.zone.west'),
            t('search.zone.south'),
            t('search.zone.north'),
            t('search.zone.center'),
          ],
          datasets: [
            {
              data: [east, west, south, north, center],
              backgroundColor: [
                '#E74C3C',
                '#F39C12',
                '#8E44AD',
                '#16A085',
                '#4169E1',
              ],
              hoverOffset: 25,
              borderColor: 'transparent',
              offset: 10,
            },
          ],
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [west, east, north, south, center]);

  return (
    <div>
      <canvas ref={chartRef} style={{ width: 100, height: '100' }} />
    </div>
  );
};

export default Diagram;
