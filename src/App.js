import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAsync } from './features/task/taskSlice';
import { Layout, Menu, Typography } from 'antd';
import 'antd/dist/antd.css';

import ModalForm from './components/ModalForm';
import SearchFilterInput from './components/SearchFilterInput';
import DataTable from './components/DataTable';

const { Header, Content, Footer } = Layout;
function App() {
  const dispatch = useDispatch();

  const { value: data } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getDataAsync());
  }, [dispatch]);

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

          <DataTable />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default App;
