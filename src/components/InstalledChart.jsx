import React from 'react';

import {
  Button, Table,
} from 'semantic-ui-react';
import Version from './Version';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const InstalledChart = (props) => {
  const { chart, history } = props;
  const {
    appVersion, chartName, name, namespace, revision, updated,
  } = chart;
  const chartDetails = [name, namespace, revision, appVersion, chartName, updated].join(' ');

  // const [historyClicked, setHistoryClicked] = useState(false);

  // useEffect(() => async () => {
  //   await props.getHistory(chart.name);
  // },
  // [historyClicked]);

  // uninstall the helm chart. saving STDOUT into object not yet implemented
  const uninstallHelmChart = async () => {
    const helmChart = chart.name;
    await exec(`helm uninstall ${helmChart}`);
    props.getDeployedCharts();
  };

  const versionsArray = [];
  console.log('Current Chart History Props: ', props);
  for (let i = 0; i < currentChartHistory.length; i++) {
    versionsArray.push(<Version
      key={`key-${i}`}
      details={currentChartHistory[i]}
    />);
  }

  // build the installed chart component
  return (
    <Table.Row>
      <Table.Cell className="installed-chart-cell">
        <Table className="borderless">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                {chartDetails}
              </Table.Cell>
              <Table.Cell>
                <Button
                  className="button-right"
                  onClick={() => {
                    props.getHistory(chart.name);
                    // if (historyClicked === false) setHistoryClicked(true);
                    // else setHistoryClicked(false);
                  }}
                  size="tiny"
                  compact
                >
                  History
                </Button>
                <Button
                  className="button-right"
                  onClick={() => uninstallHelmChart()}
                  size="tiny"
                  compact
                >
                  Uninstall
                </Button>
              </Table.Cell>
            </Table.Row>
            {historyClicked && versionsArray}
          </Table.Body>

        </Table>
      </Table.Cell>
    </Table.Row>
  );
};

export default InstalledChart;
