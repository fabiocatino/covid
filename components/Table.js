//  Requires a list, 5 headers, and 4 fields
import { Button } from '@mui/material';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import styles from './Table.module.css';
import Link from 'next/link';
import TablePagination from '@mui/material/TablePagination';
import { useRouter } from 'next/router';

const Table = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(-1);
  const router = useRouter();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let overallTotal = 0;
  let overallDeaths = 0;
  let overallNewCases = 0;
  let overallNewDeaths = 0;
  let overallTestDone = 0;

  for (const total in props.data) {
    overallTotal = overallTotal + props.data[total].cases;
    overallDeaths = overallDeaths + props.data[total].deaths;
    overallNewCases = overallNewCases + props.data[total].todayCases;
    overallNewDeaths = overallNewDeaths + props.data[total].todayDeaths;
    overallTestDone = overallTestDone + props.data[total].tests;
  }
  return (
    <>
      <TablePagination
        component="div"
        sx={{ display: 'flex' }}
        rowsPerPageOptions={[10, 50, 100, { value: -1, label: 'All' }]}
        count={props.data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <table className={styles.table}>
        <tbody>
          <tr>
            <th>
              {props.header1}
              <Button onClick={props.sortHandler1}>
                {props.direction === 'asc' ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </th>

            <th>
              {props.header2}
              <Button onClick={props.sortHandler2}>
                {props.direction === 'asc' ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </th>
            <th>
              {props.header3}
              <Button onClick={props.sortHandler3}>
                {props.direction === 'asc' ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </th>
            <th>
              {props.header4}
              <Button onClick={props.sortHandler4}>
                {props.direction === 'asc' ? (
                  <ArrowDropUpIcon />
                ) : (
                  <ArrowDropDownIcon />
                )}
              </Button>
            </th>
            {props.header5 ? (
              <th>
                {props.header5}
                <Button onClick={props.sortHandler5}>
                  {props.direction === 'asc' ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </Button>
              </th>
            ) : null}
            {props.header6 ? (
              <th>
                {props.header6}
                <Button onClick={props.sortHandler6}>
                  {props.direction === 'asc' ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </Button>
              </th>
            ) : null}
            {props.header7 ? (
              <th>
                {props.header7}
                <Button onClick={props.sortHandler7}>
                  {props.direction === 'asc' ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </Button>
              </th>
            ) : null}
            {props.header8 ? (
              <th>
                {props.header8}
                <Button onClick={props.sortHandler8}>
                  {props.direction === 'asc' ? (
                    <ArrowDropUpIcon />
                  ) : (
                    <ArrowDropDownIcon />
                  )}
                </Button>
              </th>
            ) : null}
          </tr>
          {router.asPath === '/' && (
            <tr>
              <td>Total</td>
              <td>
                <strong>{overallTotal.toLocaleString('en-US')}</strong>
              </td>
              <td>
                <strong>{overallDeaths.toLocaleString('en-US')}</strong>
              </td>
              <td>
                <strong>{overallNewCases.toLocaleString('en-US')}</strong>
              </td>
              <td>
                <strong>{overallNewDeaths.toLocaleString('en-US')}</strong>
              </td>
              <td>
                <strong>{overallTestDone.toLocaleString('en-US')}</strong>
              </td>
            </tr>
          )}
          {(rowsPerPage > 0
            ? props.data.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : props.data
          ).map((item) => (
            <tr key={item[props._id]}>
              <td >
                {props.mainLink ? (
                  <Link  href={`/details/${item[props.mainLink]}`}>
                    <strong className={styles.link}>{item[props.field1]}</strong>
                  </Link>
                ) : (
                  item[props.field1]
                )}
              </td>
              <td>
                <strong>{item[props.field2].toLocaleString('en-US')}</strong>
              </td>
              <td>
                <strong>{item[props.field3].toLocaleString('en-US')}</strong>
              </td>
              <td>
                <strong>{item[props.field4].toLocaleString('en-US')}</strong>
              </td>
              {props.header5 ? (
                <td>
                  <strong>{item[props.field5].toLocaleString('en-US')}</strong>
                </td>
              ) : null}
              {props.header6 ? (
                <td>
                  <strong>{item[props.field6].toLocaleString('en-US')}</strong>
                </td>
              ) : null}
              {props.header7 ? (
                <td>
                  <strong>{item[props.field2].toLocaleString('en-US')}</strong>
                </td>
              ) : null}
              {props.header8 ? (
                <td>
                  <strong>{item[props.field8].toLocaleString('en-US')}</strong>
                </td>
              ) : null}
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
