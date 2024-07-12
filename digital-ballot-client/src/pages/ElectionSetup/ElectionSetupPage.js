import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BallotCategory from '../../components/ElectionSetup/Ballots/BallotCategory';
import BallotMaterial from '../../components/ElectionSetup/Ballots/BallotMaterial';
import BallotSpecs from '../../components/ElectionSetup/Ballots/BallotSpecs';

const ElectionSetupPage = () => {
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
              <BallotCategory />
            </TabPanel>
            <TabPanel>
              <BallotMaterial />
            </TabPanel>
            <TabPanel>
              <BallotSpecs />
            </TabPanel>
          </Tabs>
        </TabPanel>
        {/* Add other TabPanels if needed */}
      </Tabs>
    </div>
  )
}

export default ElectionSetupPage



// import React, { Component } from 'react'

// export class ElectionSetup extends Component {
//   constructor(props) {
//     super(props)
//     this.state = { pageName: '' }
//     this.displayPlaceholder = this.displayPlaceholder.bind(this)
//   }

//   displayPlaceholder() {
//     this.setState({
//       pageName: 'This page is a placeholder for the Election Setup Page'
//     })
//   }

//   render(){
//     return(
//       <div>
//         <h1>Election Setup</h1>

//         <p>This is a simple example of a Digital Ballot Platform component</p>
//       </div>
//     )
//   }
// }