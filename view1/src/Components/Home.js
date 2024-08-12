import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Orders from './Orders';
import Perfsnap  from "./Perfsnap";
import Stockuni from "./Stockuni";
import PortfolioBarchart from "./PortfolioBarchart";
//import AlgoSelector from "./AlgoSelector";
import { useAlgoContext } from './AlgoContext';
import AlgoSelector from "./AlgoSelector";
import {Link} from "react-router-dom";

function Home() {
  const { selectedVariable } = useAlgoContext();

  return (
    <Box sx={{ display: 'flex' }}>
      <Toolbar/>
        <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
          <Container maxWidth="lg" sx={{ mt: 1, mb: 3 }}>
            <AlgoSelector />
          </Container>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper
                  sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                  }}>
                   <Chart />
              </Paper>
            </Grid>
              <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Perfsnap/>
                  </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Grid container spacing={0}>
                        <Grid item xs={4}>
                            <PortfolioBarchart />
                        </Grid>
                        <Grid item xs={8}>
                            <Orders />
                        </Grid>
                      </Grid>
                    </Paper>
              </Grid>
              <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      Agent's Stocks Universe
                      <Stockuni />
                  </Paper>
              </Grid>
          </Grid>
          <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/${selectedVariable}`} style={{ textDecoration: 'none', color: 'darkseagreen', fontWeight: 'bold', fontSize: '16px' }}>
                      Agent {selectedVariable}
                  </Link>
              </Paper>
          </Grid>
        </Container>
    </Box>
  );
}

export default Home;