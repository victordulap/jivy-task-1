import Search from 'antd/lib/input/Search';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterDataAsync } from '../features/task/taskSlice';

const SearchFilterInput = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.task);

  return (
    <Search
      placeholder="filter"
      onSearch={(value) => {
        if (value.trim()) dispatch(filterDataAsync({ filter: value.trim() }));
      }}
      loading={loading}
      enterButton
    />
  );
};

export default SearchFilterInput;
