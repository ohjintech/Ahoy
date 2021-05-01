import React from "react";
import {useState, useEffect} from "react";
import { Button, Table, Dropdown, Menu } from "semantic-ui-react";
import Version from './Version';
// import { Table } from 'semantic-ui-react';
// import {Dropdown} from 'semantic-ui-react';
const util = require("util");
const exec = util.promisify(require("child_process").exec);

// console.log("InstalledChart.jsx loaded");

const InstalledChart = (props) => {
  // console.log("props at InstalledChart: ", props);


  const chartItem = props.chartItem;
  const currentChartHistory = props.currentChartHistory;
  console.log(' InstalledChart.jsx line 18: currentChartHistory', currentChartHistory)
  const chartDetails = [];

  // builds the string to output
  console.log('chart obj: ', chart)
  const {app_version, chartName, name, namespace, revision, updated} = chart;
  const chartDetails = [name, namespace, revision, app_version, chartName, updated].join(' ')
  console.log('detailArr: ', chartDetails)
  // for (let key in chart) {
  //   chartDetails.push(chart[key] + " ");
  //   // console.log('chartDetails line 22 ' , chartDetails)
  // }

  // declare a historyClicked state variable and set it to false, returns the setHistoryclicked fcn
  const [historyClicked, setHistoryClicked] = useState(false);

  const historyArray = [];

  // not sure if useEffect is the correct tool - useEffect is something that happens after a component is rendered
  useEffect(() => {
      // for loop looking at chart.history
      // for (let i = 0; i < 5; i++){
      //   console.log('chart history length in useEffect:', chart.history)
      //   // For each element, push <Version name={chart.name}/> into the array
      //   // historyArray.push(<Version name={chart.name}/>);
      //   historyArray.push(<Version name={chart.name}/>);
      // };
      // return async () => {
        
      //   console.log('what chart are we getting?: ', chart)
      //   await props.getHistory(chart.name);
      //   console.log("I am going to render the chart: " , chart);
        
      // }
      // const historyArray = []
      if (historyClicked) showHistory(chartItem)
      console.log(`How can you click? The status is now: ${historyClicked}`)
   });


  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    console.log("uninstalling helm chart: ", chart.name);
    const helmChart = chart.name;
    const { stdout, stderr } = await exec(`helm uninstall ${helmChart}`);

    console.log("component successfully uninstalled");
    // update the charts
    props.getDeployedCharts();
  };

  console.log(`Installed Chart History on ${chart.name}: ${JSON.stringify(chart.history)}`);
  

  // async await call getHistory(), then showHistory()

  const showHistory = (chartItem) => {
    // const historyArray = [];
    console.log('showHistory: chart?', chartItem)   
    console.log('what about regular history: ',chartItem.history)
    console.log('what about regular history length: ',chartItem.history.length)

    chartItem.history.forEach( (revision, i) => {
      console.log('revision: ', revision)
      // historyArray.push(<Version key={i} name={'hello'}/>);
      historyArray.push(<Version/>);
    })
  };

  for (let i = 0; i < 2; i++) {
    
  }
  
  //const histArray = showHistory(currentChartHistory)
  

  // build the installed chart component
  return (
    <Table.Row>
      <Table.Cell className="installed-chart-cell">
        <Table className="borderless">
          <Table.Body>
            <Table.Row>
            <Table.Cell>
              {/* {chartDetails} */}
              {detailArr}
            </Table.Cell>
            <Table.Cell>
              <Button
                    className="button-right"
                    onClick={ () =>{setHistoryClicked(true)} }
                    // onClick={ () =>{setHistoryClicked(true); showHistory(chart)} }
                    // onClick={ () =>{showHistory(chart)} }
                    >History
              </Button>
              
              <Button
                    className="button-right"
                    onClick={() => uninstallHelmChart()}
              >Uninstall
              </Button>
            </Table.Cell>
            </Table.Row>
            <Table.Cell>
            <div>
              {historyClicked && historyArray}
            </div>
            </Table.Cell>
          </Table.Body>
         
        </Table>
      </Table.Cell>
    </Table.Row>



  );
};

export default InstalledChart;
