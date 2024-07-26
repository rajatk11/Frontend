import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {useCallback, useState} from "react";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Perfsnap() {
  const [data, setData] = React.useState([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const fetchData = useCallback(() => {
    fetch('/api/Portfolio')
      .then(response => response.json())
      .then(data => setData(data));
    setLastUpdate(new Date());
  });

  React.useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 20000); // Refresh data every minute

    return () => clearInterval(interval);
  }, []);

  const totalValue = data.reduce((acc, row) => acc + parseFloat(Math.abs(row.posn_val)) + parseFloat(row.avl_cash), 0);
  const today = data.reduce((acc, row) => acc + parseFloat(row.days_gain_val), 0);
  const positions = data.reduce((acc, row) => acc + parseFloat(row.posn_val), 0);
  let PortfolioBias = '';
  const totalSum = totalValue + positions;

  if (totalSum >= 0.95 * totalValue && totalSum <= 1.05 * totalValue) {
    PortfolioBias = 'Neutral';
  } else if (totalSum > 1.05 * totalValue) {
    PortfolioBias = 'Long';
  } else if (totalSum < 0.95 * totalValue) {
    PortfolioBias = 'Short';
  }

  return (
    <Card variant="outlined">
      <Box sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            Current portfolio bias
          </Typography>
          <Typography gutterBottom variant="h6" component="div">
            {PortfolioBias}
          </Typography>
        </Stack>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <Item>Total Value : ${totalValue}</Item>
          <Item>Today : ${today}</Item>
          <Item>Positions : ${positions}</Item>
        </Stack>

      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="caption" display="block" gutterBottom>
            Last updated: {lastUpdate.toLocaleString()}
          </Typography>
      </Box>
    </Card>
  );
}