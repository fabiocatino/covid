import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { Alert, AlertTitle, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useSort from '../hooks/sort';
import Search from './Search';
import Table from './Table';
import useHttp from '../hooks/http';
import { v4 as uuidv4 } from 'uuid';
import PieChart from './PieChart';

const SummaryTable = () => {
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [chartsLabels, setChartsLabels] = useState([]);
  const [chartsCases, setChartsCases] = useState(0);
  const { isLoading, error, sendHttp: getData } = useHttp();
  const { sortFunc, sortBy } = useSort();

  const transformData = useCallback((obj) => {
    const finalData = [];
    const chartsLabelsData = [];
    const chartsCasesData = [];
    for (const item in obj.data) {
      const convertedData = {
        _id: uuidv4(),
        ...obj.data[item],
      };
      const provChartsLabels = {
        label: obj.data[item].country,
      };
      const provChartsCases = {
        cases: obj.data[item].cases,
      };

      finalData.push(convertedData);
      chartsLabelsData.push(provChartsLabels.label);
      chartsCasesData.push(provChartsCases.cases);
    }
    setCountries(finalData);
    setFilteredData(finalData);
    setChartsLabels(chartsLabelsData.slice(0, 10));
    setChartsCases(chartsCasesData.slice(0, 10));
  }, []);
  useEffect(() => {
    getData(
      { url: 'https://corona.lmao.ninja/v2/countries?sort=cases' },
      transformData
    );
  }, [getData, transformData]);

  const sortHandler = () => {
    sortFunc(countries);
  };

  const sortTotalCasesHandler = () => {
    sortFunc(countries, 'cases');
  };

  const sortTotalDeathsHandler = () => {
    sortFunc(countries, 'deaths');
  };

  const sortNewCasesHandler = () => {
    sortFunc(countries, 'todayCases');
  };

  const sortNewDeathsHandler = () => {
    sortFunc(countries, 'todayDeaths');
  };

  const sortTests = () => {
    sortFunc(countries, 'tests');
  };
  const filterHandler = (data) => {
    setFilteredData(data);
  };

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{ marginTop: '10rem', display: 'flex', justifyContent: 'center' }}
      >
        {isLoading && !error && <CircularProgress size="5rem" />}
      </Container>
      {!isLoading && (
        <Container maxWidth="lg" sx={{ marginTop: '1rem' }}>
          {filteredData.length === 0 && (
            <Alert sx={{ width: 400, marginBottom: 2 }} severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong> Country not found.</strong>
            </Alert>
          )}

          <Search countries={countries} onAddFilter={filterHandler}></Search>
          <Table
            data={filteredData}
            header1="Country"
            header2="Total Cases"
            header3="Total Deaths"
            header4="New Cases"
            header5="New Deaths"
            header6="Tests Done"
            mainLink="country"
            _id="_id"
            field1="country"
            field2="cases"
            field3="deaths"
            field4="todayCases"
            field5="todayDeaths"
            field6="tests"
            direction={sortBy}
            sortHandler1={sortHandler}
            sortHandler2={sortTotalCasesHandler}
            sortHandler3={sortTotalDeathsHandler}
            sortHandler4={sortNewCasesHandler}
            sortHandler5={sortNewDeathsHandler}
            sortHandler6={sortTests}
          />

          <section id="charts">
            <PieChart
              labels={chartsLabels}
              data={chartsCases}
              title={'Top 10 Countries by cases'}
            ></PieChart>
          </section>
        </Container>
      )}
    </>
  );
};

export default SummaryTable;
