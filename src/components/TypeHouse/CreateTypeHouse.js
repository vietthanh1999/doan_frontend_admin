import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import API, { endpoints } from "../Config/Api";
import { openNotificationWithIcon } from '../Notification/Notification'

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function CreateTypeHouse() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
      try {
        let formData = new FormData()
        formData.append("name", values.type_house)
        let res = API.post('/type-house/', formData).then((response) => {
            console.log(response.data)
            openNotificationWithIcon('success', "Thêm mới loại nhà thành công")
        }).catch((error) => {
          openNotificationWithIcon('info', "Thêm mới loại nhà thất bại")
        });

    } catch(err) {
        console.error(err)
    }
  };

  return (
    <div style={{}}>
      <h2>Thêm loại nhà</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="type_house"
          label="Loại nhà"
          rules={[{ required: true, message: 'Please input your type house!', whitespace: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
