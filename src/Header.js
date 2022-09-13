import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import LabTabs from './LabTabs';
import InitialLabTabs from './InitialLabTabs';

function Header(props) {

    const { onDrawerToggle, ...other } = { ...props };

    return (
        <React.Fragment>
            <AppBar color="primary" position="sticky" elevation={0} sx={{ background: "linear-gradient(97deg, rgba(16,31,51,1) 28%, rgba(9,9,121,1) 74%, rgba(0,212,255,1) 100%)" }}>
                <Toolbar>
                    <Grid container spacing={1} alignItems="center">
                        <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={onDrawerToggle}
                                edge="start"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs />
                    </Grid>
                </Toolbar>
                <Toolbar>
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs>
                            <Typography color="inherit" variant="h5" component="h1">
                                {(other.prop1 === "none" || other.prop1 == null) ? "Welcome to MyApp!" : `Algorithm: ${other.prop1}`}
                                {/* {`\n--DEBUG--algo: ${other.prop1}--tab: ${other.prop3}`} */}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Help">
                                <IconButton href='https://drive.google.com/file/d/1SDfttkWMeUh1vzmamreGQZoJerFVndBK/view?usp=drivesdk' color="inherit">
                                    <HelpIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
                {(other.prop1 == null || other.prop1 === "none") ? <InitialLabTabs /> : <LabTabs
                    prop3={other.prop3}
                    prop4={other.prop4}
                />}
            </AppBar>
        </React.Fragment>
    );
}

Header.propTypes = {
    onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;