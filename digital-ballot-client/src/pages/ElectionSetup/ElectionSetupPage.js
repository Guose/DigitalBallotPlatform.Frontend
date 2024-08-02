import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Category from '../../components/ElectionSetup/Ballots/Category';
import Material from '../../components/ElectionSetup/Ballots/Material';
import Specs from '../../components/ElectionSetup/Ballots/Specs';

export const ElectionSetupPage = () => {
  return (
    <div>
      <h1>Election Setup</h1>
      <Tabs>
        <TabList>
          <Tab>Ballot</Tab>
          <Tab>County</Tab>
          <Tab>Watermarks</Tab>
        </TabList>

        <TabPanel>
          <h2>Ballot</h2>
          <Tabs>
            <TabList>
              <Tab>Category</Tab>
              <Tab>Material</Tab>
              <Tab>Specs</Tab>
            </TabList>

            <TabPanel>
              <Category />
            </TabPanel>
            <TabPanel>
              <Material />
            </TabPanel>
            <TabPanel>
              <Specs />
            </TabPanel>
          </Tabs>
        </TabPanel>
        {/* Add other TabPanels if needed */}
      </Tabs>
    </div>
  )
}

//export default ElectionSetupPage