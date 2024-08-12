import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useAlgoContext } from './AlgoContext';

export default function AlgoSelector() {
  const { selectedVariable, setSelectedVariable } = useAlgoContext();

  const handleChange = (event) => {
    setSelectedVariable(event.target.value);
  };

  return (

    <Box sx={{ width: '25%', marginLeft: 'auto' }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Algo
        </InputLabel>
          <NativeSelect
              value={selectedVariable}
              onChange={handleChange}
              inputProps={{
                  name: 'algo',
                  id: 'uncontrolled-native',
              }}
          >
              <option value={'OX1'}>OX1</option>
              <option value={'OX2'}>OX2</option>
              <option value={'OX3'}>OX3</option>
          </NativeSelect>
      </FormControl>
    </Box>
  );
}