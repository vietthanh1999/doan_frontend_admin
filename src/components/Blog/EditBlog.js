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
import API, { endpoints } from "../Config/Api";
import { openNotificationWithIcon } from "../Notification/Notification";
import cookie from "react-cookies";
import { useParams } from "react-router-dom";
import MyEditor from "./MyEditor";
import { Markup } from "interweave";

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

export default function EditBlog() {
  const [editor, setEditor] = useState(null);
  const [form] = Form.useForm();
  const [blog, setBlog] = useState({});
  let { id } = useParams();
  let token = {
    headers: {
      Authorization: `Bearer ${cookie.load("access_token")}`,
    },
  };

  useEffect(() => {
    const requestUrl = `blogs/${id}`;
    API.get(requestUrl)
      .then((response) => {
        console.log(response.data);
        form.setFieldsValue({
          title: response.data.name,
          description: response.data.description,
        });
        setEditor(response.data.description)
      })
      .catch((error) => {});
  }, []);

  const selectFile = (event) => {
    setBlog({ ...blog, image: event.target.files[0] });
  };

  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    try {
      let formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("image", blog.image);
      let res = API.put(`/blogs/${id}/`, formData)
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
      <h2>Thêm blog</h2>
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
          name="title"
          label="Tiêu đề"
          tooltip="Tiêu đề cho blog của bạn là gì?"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tiêu đề cho blog của bạn!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="description"
          label="Mô tả"
          tooltip="Mô tả cho blog của bạn?"
          rules={[
            {
              required: true,
              message: "Vui lòng thêm mô tả cho blog của bạn!",
              whitespace: true,
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item> */}

        <Form.Item
          label="Mô tả"
        >
          <MyEditor
            className={tailFormItemLayout}
            handleChange={(data) => {
              setEditor(data);
            }}
            data={editor}
          />
        </Form.Item>

        <Form.Item
          name="photo"
          label="Ảnh"
          rules={[
            // {
            //   required: true,
            //   message: "Vui lòng thêm ảnh cho blog của bạn!",
            //   whitespace: true,
            // },
          ]}
        >
          <input type="file" onChange={selectFile} />
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
