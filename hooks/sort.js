/**
 *
 * Accept an array, a direction ('asc', 'desc'), a set direction, and the field to filer
 *
 */

import { useState } from 'react';
const useSort = () => {
  const [sortBy, setSortBy] = useState('asc');

  const sortFunc = (list, method = null) => {
    if (sortBy === 'asc') {
      setSortBy('desc');
    } else if (sortBy === 'desc') {
      setSortBy('alp');
    } else {
      setSortBy('asc');
    }

    list.sort((a, b) => {
      if (sortBy === 'asc') {
        return a[method] > b[method] ? 1 : -1;
      } else if (sortBy === 'desc') {
        return a[method] < b[method] ? 1 : -1;
      } else {
        return a.country > b.country ? 1 : -1;
      }
    });
  };
  return { sortFunc, sortBy };
};

export default useSort;
