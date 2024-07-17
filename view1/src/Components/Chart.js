
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { LineChart } from '@mui/x-charts/LineChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot } from '@mui/x-charts/LineChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';



const timestamps = [
  new Date(2021, 1, 7, 12, 5),
  new Date(2021, 1, 7, 12, 6),
  new Date(2021, 1, 7, 12, 7),
  new Date(2021, 1, 7, 12, 8),
  new Date(2021, 1, 7, 12, 9),
  new Date(2021, 1, 7, 12, 10),
  new Date(2021, 1, 7, 12, 11),
  new Date(2021, 1, 7, 12, 12),
  new Date(2021, 1, 7, 12, 13),
  new Date(2021, 1, 7, 12, 14),
  new Date(2021, 1, 7, 12, 15),
  new Date(2021, 1, 7, 12, 16),
  new Date(2021, 1, 7, 12, 17),
  new Date(2021, 1, 7, 12, 18),
  new Date(2021, 1, 7, 12, 19),
  new Date(2021, 1, 7, 12, 20),
];


const indexvals = [
    .01, .02, .03, .02, .01, -.02, -.03,-.09, -.06, -.05, 0, .02, .03, .06, .05, .08
];
const portfoliovals = [
    .01, .02, .04, .05, .02, .04, .02,.03, .05, .06, .1, .08, .1, .12, .11, .13
];

const lineChartsParams = {
  series: [
    {
      label: 'Index Performance',
      data: indexvals,
      showMark: false,
    },
    {
      label: 'Portfolio Performance',
      data: portfoliovals,
      showMark: false,
    },

  ],
  width: 1000,
  height: 220,
};

//const yearFormatter = (date) => date.getFul().toString();
export default function Chart() {
  const [selectedRange, setSelectedRange] = useState('day');
  const handleRangeChange = (range) => {
      setSelectedRange(range);
  };
  const buttons = [
    <Button key="minute" fullWidth onClick={() => handleRangeChange('minute')}>Minute</Button>,
    <Button key="hour" fullWidth onClick={() => handleRangeChange('hour')}>Hour</Button>,
    <Button key="day" fullWidth onClick={() => handleRangeChange('day')}>Day</Button>,
  ];
  return (
      <Grid container spacing={7} alignItems="center">
        <Grid item xs={10} md={10} lg={10}>
                <LineChart
                  {...lineChartsParams}
                  xAxis={[{ data: timestamps, scaleType: 'time' }]}
                  series={lineChartsParams.series.map((series) => ({
                      ...series,
                  }))}
                />
        </Grid>
        <Grid item xs={2} md={2} lg={2}>


            <ButtonGroup orientation="vertical" aria-label="Vertical button group" sx={{ width: '100%' }}>
              {buttons}
            </ButtonGroup>

        </Grid>
      </Grid>
  );
}