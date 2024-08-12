import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import StockChart from "../components/StockChart";
import { useParams } from 'react-router-dom';
import AlgoSelector from "../components/AlgoSelector";
import StockTable from "../components/StockTable";

function StockPage() {
    const { stock } = useParams();
    const logoPath = `/assets/stock_logos/${stock}.png`;
    return (
        <Box sx={{display: 'flex'}}>
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 2, mb: 2}}>
                <Grid container spacing={0}>
                    <Grid item xs={4}>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={logoPath} alt={`${stock} logo`} style={{height: 40, marginRight: 8}}/>
                      </div>
                    </Grid>
                    <Grid item xs={8}>
                        <AlgoSelector />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 240,
                            }}>
                            <StockChart stock={stock}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                            <StockTable stock={stock}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default StockPage;