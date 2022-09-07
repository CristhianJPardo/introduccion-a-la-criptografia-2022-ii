import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

export default function LabTabs(props) {

    const [value, setValue] = React.useState('1');

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>

                    {/* {props.prop3} */}
                    <TabList
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            props.prop4(newValue)
                        }}
                        aria-label="lab API tabs example"

                    >
                        <Tab
                            label="Info"
                            value="1"
                            sx={{ color: "#ccc" }}
                        />
                        <Tab
                            label="Encrypt"
                            value="2"
                            sx={{ color: "#ccc" }}
                        />
                        <Tab
                            label="Decrypt"
                            value="3"
                            sx={{ color: "#ccc" }}
                        />
                        <Tab
                            label="Attack"
                            value="4"
                            sx={{ color: "#ccc" }}
                        />
                    </TabList>
                </Box>
            </TabContext>
        </Box>
    );
}