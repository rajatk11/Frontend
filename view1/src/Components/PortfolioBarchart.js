import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
//import { HighlightedCode } from '@mui/docs/HighlightedCode';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {fetchPortfolio} from "./pullData";


function createData(stock, posn_size) {
  const high = Number(posn_size) > 0 ? Number(posn_size) : 0;
  const low = Number(posn_size) <= 0 ? Number(posn_size) : 0;
  return {
    stock,
    high,
    low,
    };
}

export default function PortfolioBarchart() {
  const [ds, setDs] = useState([]);
  const layout = 'horizontal';

  useEffect(() => {
    fetchPortfolio().then(data => {

      if (data) {
        const dataset = data.map(item => createData(item.stock, item.posn_val));
        setDs(dataset);
      }
    });
  }, []);

  return (
    <Stack direction="column" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
      <Stack direction="row" spacing={4}>
        <Stack direction="column" spacing={1} flex={1}>
          <Typography gutterBottom>Portfolio Positioning in $</Typography>
        </Stack>

      </Stack>
      <BarChart
        series={[
          { dataKey: 'high', label: 'Long', layout, stack: 'stack', color: 'green'},
          { dataKey: 'low', label: 'Short', layout, stack: 'stack', color: 'darkred'},
        ]}
        dataset={ds}
        height={400}
        yAxis={[{ scaleType: 'band', dataKey: 'stock' }]}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
          },
        }}
        slotProps={{
          legend: {
            direction: 'row',
            position: { vertical: 'bottom', horizontal: 'middle' },
            padding: -5,
          },
        }}
        borderRadius={10}
      />

    </Stack>
  );
}

/*
const dataset = [
  [0, -95000, 'First'],
  [0, -54500, 'Second'],
  [10720, 0, 'Third'],
  [0, 0, 'Fourth'],
  [90000, 0, 'Fifth'],
  [0, -46000, 'Sixth'],
  [0, 0, 'Seventh'],
  [0, 6, 'Eighth'],
  [9, 6, 'Ninth'],
  [9, 6, 'Tenth'],
  [9, 6, 'Eleventh'],
  [9, 6, 'Twelfth'],
  ].map(([high, low, order]) => ({
  high,
  low,
  order,
}));



const chartSettingsH = {
  ds,
  height: 400,
  yAxis: [{ scaleType: 'band', dataKey: 'order' }],
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
  slotProps: {
    legend: {
      direction: 'row',
      position: { vertical: 'bottom', horizontal: 'middle' },
      padding: -5,
    },
  },
};
const chartSettingsV = {
  ...chartSettingsH,
  xAxis: [{ scaleType: 'band', dataKey: 'order' }],
  yAxis: undefined,
};



*/