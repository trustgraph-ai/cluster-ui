
import React from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@mui/lab/TabPanel';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';

import ChatPanel from './ChatPanel';

interface ControlPanelProps {
}

const ControlPanel : React.FC<ControlPanelProps> =
    ({ }) => 
{

    const [value, setValue] = React.useState('chat');

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <TabContext value={value}>    
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange}>
                        <Tab label="Chat" value="chat"/>
                    </TabList>
                </Box>
                <TabPanel value="chat">
                    <ChatPanel/>
                </TabPanel>
            </TabContext>
        </Box>
    );

}

export default ControlPanel;

