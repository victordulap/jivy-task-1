import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table } from 'antd';
import { deleteItem } from '../features/task/taskSlice';

const DataTable = () => {
  const { value: data, loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Job',
      dataIndex: 'Job',
      key: 'Job',
    },
    {
      title: 'City',
      dataIndex: 'City',
      key: 'City',
    },
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
    },
    {
      title: 'DateCreated',
      dataIndex: 'DateCreated',
      key: 'DateCreated',
    },
    {
      title: 'Phone Number',
      dataIndex: 'Phone Number',
      key: 'Phone Number',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button onClick={() => dispatch(deleteItem({ id: record.id }))} danger>
          Delete {record.Name}
        </Button>
      ),
    },
  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={{ pageSize: 5 }}
      scroll={{ x: '150vh' }}
      loading={loading}
    />
  );
};

export default DataTable;
