import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { useState } from 'react';
import Category from '../../components/ElectionSetup/Ballots/Category';
import Material from '../../components/ElectionSetup/Ballots/Material';
import Specs from '../../components/ElectionSetup/Ballots/Specs';

const drawerWidth = 240;

export const ElectionSetupPage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <Category />;
      case 1:
        return <Material />;
      case 2:
        return <Specs />;
      default:
        return <Category />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6" noWrap component="div" sx={{ padding: 2 }}>
          Election Setup
        </Typography>
        <List>
          <ListItem button selected={selectedIndex === 0} onClick={() => handleListItemClick(0)}>
            <ListItemText primary="Ballot" />
          </ListItem>
          <ListItem button selected={selectedIndex === 1} onClick={() => handleListItemClick(1)}>
            <ListItemText primary="County" />
          </ListItem>
          <ListItem button selected={selectedIndex === 2} onClick={() => handleListItemClick(2)}>
            <ListItemText primary="Watermarks" />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {renderContent()}
      </Box>
    </div>
  );
};



// import React from 'react';
// import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@mui/material';
// import Category from '../../components/ElectionSetup/Ballots/Category';
// import Material from '../../components/ElectionSetup/Ballots/Material';
// import Specs from '../../components/ElectionSetup/Ballots/Specs';
// import { useState } from 'react';

// const steps = [
//   { label: 'Ballot', content: 'Configure the ballot details', component: <Category /> },
//   { label: 'County', content: 'Set up county information', component: <Material /> },
//   { label: 'Watermarks', content: 'Define watermarks', component: <Specs /> },
// ];

// export const ElectionSetupPage = () => {
//   const [activeStep, setActiveStep] = useState(0);

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <div>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Election Setup
//       </Typography>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel>{step.label}</StepLabel>
//             <StepContent>
//               <Typography>{step.content}</Typography>
//               <div>{step.component}</div>
//               <div>
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={handleBack}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   Back
//                 </Button>
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
//                 </Button>
//               </div>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you're finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       )}
//     </div>
//   );
// };



// import React from 'react'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import 'react-tabs/style/react-tabs.css'
// import Category from '../../components/ElectionSetup/Ballots/Category'
// import Material from '../../components/ElectionSetup/Ballots/Material'
// import Specs from '../../components/ElectionSetup/Ballots/Specs'

// export const ElectionSetupPage = () => {
//   return (
//     <div>
//       <h1>Election Setup</h1>
//       <Tabs>
//         <TabList>
//           <Tab>Ballot</Tab>
//           <Tab>County</Tab>
//           <Tab>Watermarks</Tab>
//         </TabList>

//         <TabPanel>
//           <h2>Ballot</h2>
//           <Tabs>
//             <TabList>
//               <Tab>Category</Tab>
//               <Tab>Material</Tab>
//               <Tab>Specs</Tab>
//             </TabList>

//             <TabPanel>
//               <Category />
//             </TabPanel>
//             <TabPanel>
//               <Material />
//             </TabPanel>
//             <TabPanel>
//               <Specs />
//             </TabPanel>
//           </Tabs>
//         </TabPanel>
        
//       </Tabs>
//     </div>
//   )
// }