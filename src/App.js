import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  addDataAsync,
  deleteItem,
  filterDataAsync,
  getDataAsync,
  loadMoreDataAsync,
} from './features/task/taskSlice';
import {
  Layout,
  Menu,
  Typography,
  Button,
  Table,
  Modal,
  Form,
  Input,
} from 'antd';
import 'antd/dist/antd.css';

import Search from 'antd/lib/input/Search';
import { recordExpression } from '@babel/types';

const { Header, Content, Footer } = Layout;
function App() {
  const [showFormModal, setShowFormModal] = useState(false);

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

  const [form] = Form.useForm();

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
          {/* <Button
            loading={loading}
            onClick={() =>
              dispatch(
                addDataAsync({
                  item: {
                    Job: 'test',
                    City: 'test',
                    Name: 'test',
                    Email: 'test@test.com',
                    DateCreated: new Date().toUTCString(),
                    'Phone Number': '(test) 606-4675',
                  },
                })
              )
            }
          >
            Add item
          </Button> */}
          <Modal
            confirmLoading={loading}
            visible={showFormModal}
            title="Create a new item"
            okText="Create"
            cancelText="Cancel"
            onCancel={() => {
              setShowFormModal(false);
            }}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  form.resetFields();
                  // onCreate(values);
                  console.log(values);
                  setShowFormModal(false);
                  dispatch(
                    addDataAsync({
                      item: {
                        ...values,
                        DateCreated: new Date().toUTCString(),
                      },
                    })
                  );
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            }}
          >
            <Form
              form={form}
              layout="vertical"
              name="form_in_modal"
              initialValues={{
                modifier: 'public',
              }}
            >
              <Form.Item name="Name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="Job" label="Job" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item name="City" label="City" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                name="Email"
                label="Email"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="Phone Number"
                label="Phone Number"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
          <Button loading={loading} onClick={() => setShowFormModal(true)}>
            Add item
          </Button>
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
