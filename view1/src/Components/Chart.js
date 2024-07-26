import React, {useState, useEffect, useCallback} from 'react';
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
import Typography from "@mui/material/Typography";
import {fetchPerfHistory, fetchPortfolio} from "./pullData";

// fetchPerfHistory function in `view1/src/components/pullData.js`



function calculatePercentageChange(numbers) {
  if (numbers.length === 0) return [];

  const baseValue = numbers[0];

  return numbers.map(number => {
    const percentageChange = ((number - baseValue) / baseValue) * 100;
    return Number(percentageChange.toFixed(2));
  });
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
        <p>{`Time: ${new Date(label).toLocaleString()}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toFixed(2)}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};



export default function Chart() {
  const [selectedRange, setSelectedRange] = useState('day');
  const [indexData, setIndexData] = useState([]);
  const [portfolioData, setPortfolioData] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = useCallback(() => {
    fetchPerfHistory('SP500', selectedRange).then(data => {
      if (data) {
        const dataset = data.map(item => (item.value));
        setIndexData(calculatePercentageChange(dataset));
        const timestampdata = data.map(item => new Date(item.timestamp));
        setTimestamps(timestampdata);
      }
    });

    fetchPerfHistory('portfolio', selectedRange).then(data => {
      if (data) {
        const dataset1 = data.map(item => (item.value));
        setPortfolioData(calculatePercentageChange(dataset1));
      }
    });
    setLastUpdate(new Date());
  }, [selectedRange]);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 20000); // Refresh data every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [selectedRange, fetchData]);

  const lineChartsParams = {
    series: [
      {
        label: 'Index Performance',
        data: indexData,
        showMark: false,
      },
      {
        label: 'Portfolio Performance',
        data: portfolioData,
        showMark: false,
      },
    ],
    width: 1000,
    height: 220,
  };

  const buttons = [
    <Button key="min" fullWidth onClick={() => handleRangeChange('min')}>Minute</Button>,
    <Button key="hour" fullWidth onClick={() => handleRangeChange('hour')}>Hour</Button>,
    <Button key="day" fullWidth onClick={() => handleRangeChange('day')}>Day</Button>,
  ];

  return (
    <Grid container spacing={10} alignItems="center">
      <Grid item xs={10} md={10} lg={10}>
        <LineChart
          {...lineChartsParams}
          xAxis={[{ data: timestamps, scaleType: 'time' }]}
          series={lineChartsParams.series.map((series) => ({
            ...series
          }))}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="caption" display="block" gutterBottom>
            Last updated: {lastUpdate.toLocaleString()}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={2} md={2} lg={2}>
        <ButtonGroup orientation="vertical" aria-label="Vertical button group" sx={{ width: '100%' }}>
          {buttons}
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}