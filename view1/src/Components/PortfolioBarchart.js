
import React, { useState, useEffect, useCallback } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import Stack from '@mui/material/Stack';
//import { HighlightedCode } from '@mui/docs/HighlightedCode';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {fetchPortfolio} from "./pullData";
import Box from "@mui/material/Box";
import {useAlgoContext} from "./AlgoContext";



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
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const layout = 'horizontal';
  const { selectedVariable } = useAlgoContext();

  const fetchData = useCallback(() => {
    fetchPortfolio(selectedVariable).then(data => {
      if (data) {
        const dataset = data.map(item => createData(item.stock, item.posn_val));
        setDs(dataset);
      }
      setLastUpdate(new Date());
    });

  });
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh data every minute

    return () => clearInterval(interval);
  }, [selectedVariable]);

  const modifiedDs = ds.map(item => ({
  ...item,
  logoUrl: `/assets/stock_logos/${item.stock.png}`
  }));
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
          { dataKey: 'low', label: 'Short', layout, stack: 'stack', color: '#c62828',},
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


      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="caption" display="block" gutterBottom>
            Last updated: {lastUpdate.toLocaleString()}
          </Typography>
      </Box>
    </Stack>
  );
}
