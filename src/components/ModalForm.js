import { Modal, Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDataAsync } from '../features/task/taskSlice';

const ModalForm = () => {
  const [showFormModal, setShowFormModal] = useState(false);

  const { loading } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  return (
    <>
      <Button loading={loading} onClick={() => setShowFormModal(true)}>
        Add item
      </Button>
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
    </>
  );
};

export default ModalForm;
