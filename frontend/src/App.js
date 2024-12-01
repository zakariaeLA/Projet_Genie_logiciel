import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UpcomingEvents from './components/upcomingEvents/UpcomingEvents';
import EventHistory from './components/eventHistory/EventHistory'
function App() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="App">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Les événements à venir" value="1" />
                <Tab label="Historiques des événements" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
                <UpcomingEvents />
            </TabPanel>
            <TabPanel value="2">
                <EventHistory />
            </TabPanel>
          </TabContext>
        </Box>
    </div>
  );
}

export default App;
