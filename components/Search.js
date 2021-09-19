import React from 'react';
import styles from './Search.module.css';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


const Search = (props) => {
  const filterHandler = (e) => {
    const filteredData = [];
    props.countries
      .filter(
        (item) =>
          (item.country
            ? item.country.toLowerCase().includes(e.target.value.toLowerCase())
            : null) ||
          (item.Country
            ? item.Country.toLowerCase().includes(e.target.value.toLowerCase())
            : null) ||
          (item.Province
            ? item.Province.toLowerCase().includes(e.target.value.toLowerCase())
            : null) ||
          (item.country ? item.country.includes(e.target.value.toLowerCase()) : null) ||
          (item.Country ? item.Country.includes(e.target.value.toLowerCase()) : null) ||
          (item.Province ? item.Province.includes(e.target.value.toLowerCase()) : null)
      )
      .map((item) => filteredData.push(item));
    props.onAddFilter(filteredData);
  };

  return (
    <Stack
      id="back-to-top-anchor"
      className={styles.searchBar}
      spacing={1}
      sx={{ width: 300 }}
    >
      <TextField
        id="free-solo-2-demo"
        onChange={filterHandler}
        label="Search by Country"
      />
    </Stack>
  );
};

export default Search;
