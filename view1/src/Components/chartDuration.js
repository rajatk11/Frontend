import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';

const buttons = [
  <Button key="minute" fullWidth>Minute</Button>,
  <Button key="hour" fullWidth>Hour</Button>,
  <Button key="day" fullWidth>Day</Button>,
];

export default function ChartDuration() {
  return (
    <Box
      sx={{
        display: 'flex',
          alignItems: 'center',
        '& > *': {
          m: 1,
        },
        height: 240
      }}
    >
      <ButtonGroup orientation="vertical" aria-label="Vertical button group" sx={{
          display: 'flex',
          alignItems: 'bottom',
            '& > *': {
                m: 2,
            },
          height: 280,
          width: '100%' }}
      >
        {buttons}
      </ButtonGroup>
    </Box>
  );
}