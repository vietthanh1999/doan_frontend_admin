import React, { useEffect, useState } from "react";
import { Table, Tag, Space, Button } from "antd";
import API, { endpoints } from "../Config/Api";
import { Link } from "react-router-dom";
import { openNotificationWithIcon } from '../Notification/Notification'

const { Column, ColumnGroup } = Table;

export default function Blog() {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const requestUrl = `blogs/`;
    API.get(requestUrl)
      .then((response) => {
        console.log(response.data.results);
        setBlog(response.data.results);
      })
      .catch((error) => {});
  }, []);

  const deleteBlog = (id) => {
    try {
      let formData = new FormData();
      formData.append("delete_flag", true);
      let res = API.put(`/blogs/${id}/`, formData)
        .then((response) => {
          openNotificationWithIcon(
            "success",
            "Xóa loại nhà thành công"
          );
        })
        .catch((error) => {
          openNotificationWithIcon("error", "Xóa loại nhà thất bại");
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Danh sách blog</h2>
      <Table dataSource={blog}>
        <Column title="id" dataIndex="id" key="id" />
        <Column title="Tên blog" dataIndex="name" key="name" />
        <Column title="Mô tả" dataIndex="description" key="description" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space key={record.id} size="middle">
              <Link to={`/edit-blog/${record.id}`}>Edit</Link>
              <Button type="link" onClick={(e) => deleteBlog(record.id)}>Xóa</Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
