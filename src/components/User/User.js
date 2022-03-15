import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import API, { endpoints } from "../Config/Api";
import { Link } from 'react-router-dom'
const { Column, ColumnGroup } = Table;

export default function User() {
  const [typeHouse, setTypeHouse] = useState([]);
  useEffect(() => {
    const requestUrl = `users`;
    API.get(requestUrl)
      .then((response) => {
        console.log(response.data.results);
        setTypeHouse(response.data.results);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      <Table dataSource={typeHouse}>
        <Column title="id" dataIndex="id" key="id" />
        <Column title="First name" dataIndex="first_name" key="first_name" />
        <Column title="Last name" dataIndex="last_name" key="last_name" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Username" dataIndex="username" key="username" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Link to={`/edit-user/${record.id}`}>Edit</Link>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
}
