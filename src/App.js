import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, getDataAsync } from './features/task/taskSlice';
import { Layout, Menu, Typography, Button, Table } from 'antd';
import 'antd/dist/antd.css';

import Search from 'antd/lib/input/Search';
import { recordExpression } from '@babel/types';
import ModalForm from './components/ModalForm';
import SearchFilterInput from './components/SearchFilterInput';

const { Header, Content, Footer } = Layout;
function App() {
  const dispatch = useDispatch();

  const { value: data, loading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

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
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">task</Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div className="site-layout-background" style={{ padding: 24 }}>
          <ModalForm />
          <SearchFilterInput />
          <Typography.Title>Total items: {data.length}</Typography.Title>

          <Table
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 5 }}
            scroll={{ x: '150vh' }}
            loading={loading}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
