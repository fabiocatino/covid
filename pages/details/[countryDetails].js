import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Table from '../../components/Table';
import { Container } from '@mui/material';
import useSort from '../../hooks/sort';
import CircularProgress from '@mui/material/CircularProgress';
import useHttp from '../../hooks/http';
import Search from '../../components/Search';
import Head from 'next/head';
import LineChart from '../../components/LineChart';

const CountryDetails = () => {
  const router = useRouter();
  let countryName = router.query.countryDetails;
  const [dailyData, setDailyData] = useState([]);
  const { isLoading, error, sendHttp: getGlobalData } = useHttp();
  const {
    isLoading: isHLoading,
    isHError,
    sendHttp: getHistoricalData,
  } = useHttp();
  const { sortFunc, sortBy } = useSort();
  const [filteredData, setFilteredData] = useState([]);
  const [isProvince, setIsProvince] = useState(true);
  const [todayActive, setTodayActive] = useState(0);
  const [historicalData, setHistoricalData] = useState([]);
  const [historicalDeaths, setHistoricalDeaths] = useState([]);
  const [activeCases, setActiveCases] = useState([]);
  const [activeDeaths, setActiveDeaths] = useState([]);

  const urlDate = new Date(
    new Date().valueOf() - 1000 * 60 * 60 * 48
  ).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const date = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const transformHData = useCallback((data) => {
    const historyCases = [];
    const historyDeaths = [];
    const dailyCases = [];
    const dailyDeaths = [];

    const cases = {
      ...data.data.timeline.cases,
    };
    const deaths = {
      ...data.data.timeline.deaths,
    };

    historyCases.push(cases);
    historyDeaths.push(deaths);

    for (let i = 0; i < Object.values(historyCases[0]).length - 1; i++) {
      let res =
        Object.values(historyCases[0])[i + 1] -
        Object.values(historyCases[0])[i];
      dailyCases.push(res);
    }
    for (let i = 0; i < Object.values(historyDeaths[0]).length - 1; i++) {
      let res =
        Object.values(historyDeaths[0])[i + 1] -
        Object.values(historyDeaths[0])[i];
      dailyDeaths.push(res);
    }

    setHistoricalData(historyCases);
    setHistoricalDeaths(historyDeaths);
    setActiveCases(dailyCases);
    setActiveDeaths(dailyDeaths);
  }, []);

  const transformedData = useCallback(
    (obj) => {
      const currDay = [];
      for (const day in obj.data) {
        if (obj.data[day].Date === date + 'T00:00:00Z') {
          const newData = {
            ...obj.data[day],
          };
          setTodayActive(obj.data[day].Active);
          if (newData.Province.length === 0) {
            setIsProvince(false);
          }
          currDay.push(newData);
        }
      }
      setDailyData(currDay);
      setFilteredData(currDay);
    },
    [date]
  );

  useEffect(() => {
    getGlobalData(
      {
        url: `https://api.covid19api.com/live/country/${countryName}/status/confirmed/date/${urlDate}T00:00:00Z`,
      },
      transformedData
    );
  }, [countryName, urlDate, getGlobalData, transformedData, isProvince]);

  useEffect(() => {
    console.log(countryName);

    getHistoricalData(
      {
        url: `https://corona.lmao.ninja/v2/historical/${countryName}?lastdays=90`,
      },
      transformHData
    );
  }, [countryName, transformHData, getHistoricalData]);

  const sortHandler = () => {
    sortFunc(dailyData);
  };

  const sortTotalCasesHandler = () => {
    sortFunc(dailyData, 'Active');
  };

  const sortTotalDeathsHandler = () => {
    sortFunc(dailyData, 'Deaths');
  };

  const sortActiveCasesHandler = () => {
    sortFunc(dailyData, 'Confirmed');
  };

  const filterHandler = (data) => {
    setFilteredData(data);
  };
  return (
    <>
      <Head>
        <title>{router.query.countryDetails}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {error && (
        <Container
          maxWidth="lg"
          sx={{ marginTop: '10rem', display: 'flex', justifyContent: 'center' }}
        >
          Something went wrong. Please, try again later.
        </Container>
      )}
        {isLoading && !error && 
      <Container
          maxWidth="lg"
          sx={{ marginTop: '10rem', display: 'flex', justifyContent: 'center' }}
        >
         <CircularProgress size="5rem" />
        </Container>
    }
      {!isLoading && (
        <Container maxWidth="lg" sx={{ marginTop: '10rem' }}>
          <Search countries={dailyData} onAddFilter={filterHandler}></Search>
          <Table
            data={filteredData}
            header1="City/State"
            header2="Total Cases"
            header3="Deaths"
            header4="Active Cases"
            _id="ID"
            field1={!isProvince ? 'Country' : 'Province'}
            field2="Confirmed"
            field3="Deaths"
            field4="Active"
            direction={sortBy}
            sortHandler1={sortHandler}
            sortHandler2={sortTotalCasesHandler}
            sortHandler3={sortTotalDeathsHandler}
            sortHandler4={sortActiveCasesHandler}
          ></Table>
          {!isHLoading && !isHError && (
            <Container id="charts" maxWidth="md">
              <LineChart
                labels={Object.keys(historicalData[0])}
                data={Object.values(activeCases)}
                deaths={Object.values(activeDeaths)}
                title={router.query.countryDetails}
              ></LineChart>
            </Container>
          )}
          {isHError && <p>Cannot load data. Please, try again later.</p>}
          {!isLoading && historicalData.length === 0 && (
            <Container
              maxWidth="lg"
              sx={{
                marginTop: '10rem',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <p>No data found.</p>
            </Container>
          )}
        </Container>
      )}
    </>
  );
};

export default CountryDetails;
