import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteItem,
  filterDataAsync,
  getDataAsync,
  loadMoreDataAsync,
} from './features/task/taskSlice';
import {
  Layout,
  Menu,
  Breadcrumb,
  Spin,
  Skeleton,
  Typography,
  List,
  Avatar,
  Card,
  Button,
} from 'antd';
import 'antd/dist/antd.css';

import { LoadingOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';

const { Header, Content, Footer } = Layout;
function App() {
  const dispatch = useDispatch();

  const { value: data, loading } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getDataAsync());
  }, []);

  const loadMore = () => {
    dispatch(loadMoreDataAsync());
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">task</Menu.Item>
          <Menu.Item key="2" onClick={loadMore}>
            load more
          </Menu.Item>
        </Menu>
      </Header>
      <Content
        className="site-layout"
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div className="site-layout-background" style={{ padding: 24 }}>
          <Search
            placeholder="filter"
            onSearch={(value) => {
              if (value.trim())
                dispatch(filterDataAsync({ filter: value.trim() }));
            }}
            loading={loading}
            enterButton
          />
          <Typography.Title>Total items: {data.length}</Typography.Title>
          <List
            header={<div>Header</div>}
            grid={{ gutter: 16, column: 2 }}
            bordered
            dataSource={data}
            loading={loading}
            renderItem={(item) => (
              <List.Item>
                <Card loading={loading} title={`Name: ${item.Name}`}>
                  <p>id: {item.id}</p>
                  <p>Job: {item.Job}</p>
                  <p>City: {item.City}</p>
                  <p>Email: {item.Email}</p>
                  <p>DateCreated: {item.DateCreated}</p>
                  <p>Phone Number: {item['Phone Number']}</p>
                  <Button
                    block
                    danger
                    onClick={() => dispatch(deleteItem({ id: item.id }))}
                  >
                    delete
                  </Button>
                </Card>
              </List.Item>
            )}
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
