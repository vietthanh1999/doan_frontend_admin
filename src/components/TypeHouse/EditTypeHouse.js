import React, { useState, useEffect } from "react";
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
} from "antd";
import { useParams } from "react-router-dom";
import API, { endpoints } from "../Config/Api";
import { openNotificationWithIcon } from "../Notification/Notification";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
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

export default function EditTypeHouse() {
  const [form] = Form.useForm();
  let { id } = useParams();

  useEffect(() => {
    const requestUrl = `type-house/${id}`;
    API.get(requestUrl)
      .then((response) => {
        console.log(response.data);
        form.setFieldsValue({
          type_house: response.data.name,
        });
      })
      .catch((error) => {});
  }, []);

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    try {
      let formData = new FormData();
      formData.append("name", values.type_house);
      let res = API.put(`/type-house/${id}/`, formData)
        .then((response) => {
          openNotificationWithIcon(
            "success",
            "Cập nhật thông tin loại nhà thành công"
          );
        })
        .catch((error) => {
          openNotificationWithIcon("info");
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Cập nhật loại nhà</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "86",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="type_house"
          label="Loại nhà"
          rules={[
            {
              required: true,
              message: "Please input your type house!",
              whitespace: true,
            },
          ]}
          values={3}
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
}
