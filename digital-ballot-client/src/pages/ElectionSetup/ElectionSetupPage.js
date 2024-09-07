import React from 'react'
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography } from '@mui/material'
import County from '../../components/ElectionSetup/Counties/County'
import Category from '../../components/ElectionSetup/Ballots/Category'
import Material from '../../components/ElectionSetup/Ballots/Material'
import Specs from '../../components/ElectionSetup/Ballots/Specs'
import { useState } from 'react'

const steps = [
  { label: 'County', content: 'Fill in county details', component: <County /> },
  { label: 'Ballot', content: 'Configure the ballot details', component: <Category /> },
  { label: 'Material', content: 'Set up county information', component: <Material /> },
  { label: 'Ballot Specs', content: 'Define watermarks', component: <Specs /> },
];

export const ElectionSetupPage = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Election Setup
      </Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography>{step.content}</Typography>
              <div>{step.component}</div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};


// import React from 'react';
// import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import Category from '../../components/ElectionSetup/Ballots/Category';
// import Material from '../../components/ElectionSetup/Ballots/Material';
// import Specs from '../../components/ElectionSetup/Ballots/Specs';

// export const ElectionSetupPage = () => {
//   return (
//     <div>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Election Setup
//       </Typography>

//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel1a-content"
//           id="panel1a-header"
//         >
//           <Typography>Ballot</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel1a-content"
//               id="panel1a-header"
//             >
//               <Typography>Category</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Category />
//             </AccordionDetails>
//           </Accordion>
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel2a-content"
//               id="panel2a-header"
//             >
//               <Typography>Material</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Material />
//             </AccordionDetails>
//           </Accordion>
//           <Accordion>
//             <AccordionSummary
//               expandIcon={<ExpandMoreIcon />}
//               aria-controls="panel3a-content"
//               id="panel3a-header"
//             >
//               <Typography>Specs</Typography>
//             </AccordionSummary>
//             <AccordionDetails>
//               <Specs />
//             </AccordionDetails>
//           </Accordion>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel2a-content"
//           id="panel2a-header"
//         >
//           <Typography>County</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             County Content Here
//           </Typography>
//         </AccordionDetails>
//       </Accordion>

//       <Accordion>
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls="panel3a-content"
//           id="panel3a-header"
//         >
//           <Typography>Watermarks</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Typography>
//             Watermarks Content Here
//           </Typography>
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// }
