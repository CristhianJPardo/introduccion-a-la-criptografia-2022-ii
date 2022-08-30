import * as React from 'react';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import CategoryIcon from '@mui/icons-material/Category';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import SimpleAccordion from './SimpleAccordion';

const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
        bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
};

const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props;

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
                    MyApp
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }}>
                    <ListItemIcon>
                        <CategoryIcon />
                    </ListItemIcon>
                    <ListItemText>Project Overview</ListItemText>
                </ListItem>

                <Box key="Algorithms" sx={{ bgcolor: '#101F33' }}>
                    <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText sx={{ color: '#fff' }}>Algorithms</ListItemText>
                    </ListItem>

                    <ListItem disablePadding key="selector">
                        {/* <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><DeviceHubIcon /></ListItemIcon>
                            <ListItemText>Known Algorithm</ListItemText>
                            
                        </ListItemButton> */}
                        <SimpleAccordion />
                    </ListItem>

                    <ListItem disablePadding key="cryptoAnalysis">
                        <ListItemButton selected={true} sx={item}>
                            <ListItemIcon><QueryStatsIcon /></ListItemIcon>
                            <ListItemText>Cryptoanalysis</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <Divider sx={{ mt: 2 }} />
                </Box>

                <Box key="Other Options" sx={{ bgcolor: '#101F33' }}>
                    <ListItem sx={{ py: 2, px: 3 }}>
                        <ListItemText sx={{ color: '#fff' }}>Other Options</ListItemText>
                    </ListItem>

                    <ListItem disablePadding key="records">
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><CenterFocusStrongIcon /></ListItemIcon>
                            <ListItemText>Records</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding key="settings">
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><SettingsIcon /> </ListItemIcon>
                            <ListItemText>Settings</ListItemText>
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding key="home">
                        <ListItemButton selected={false} sx={item}>
                            <ListItemIcon><HomeIcon /></ListItemIcon>
                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </ListItem>


                    <Divider sx={{ mt: 2 }} />
                </Box>
            </List>
        </Drawer>
    );
}