import React, { useEffect, useState } from "react";
import { Table, Tag, Space } from "antd";
import API, { endpoints } from "../Config/Api";
const { Column, ColumnGroup } = Table;

export default function Transaction() {
  const [typeHouse, setTypeHouse] = useState([]);
  useEffect(() => {
    const requestUrl = `type-house/`;
    API.get(requestUrl)
      .then((response) => {
        console.log(response.data.results);
        setTypeHouse(response.data.results);
      })
      .catch((error) => {});
  }, []);

  return (
    <div>
      <h2>Danh sách giao dịch</h2>
      <Table dataSource={typeHouse}>
      <Column title="id" dataIndex="id" key="id" />
      <Column title="Name type house" dataIndex="name" key="name" />
      <Column
        title="Action"
        key="action"
        render={(text, record) => (
          <Space size="middle">
            <a>Edit {record.name}</a>
            <a>Delete</a>
          </Space>
        )}
      />
    </Table>
    </div>

  );
}
