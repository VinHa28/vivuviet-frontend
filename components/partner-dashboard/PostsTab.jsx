"use client";

import { useState } from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import TextEditorModal from "@/components/ui/TextEditorModal";

export default function PostsTab({ posts }) {
  const [editorOpen, setEditorOpen] = useState(false);

  const columns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (d) => new Date(d).toLocaleDateString("vi-VN"),
    },
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <h3>Bài viết</h3>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setEditorOpen(true)}
        >
          Tạo bài viết
        </Button>
      </div>

      <Table columns={columns} dataSource={posts} rowKey="_id" />

      <TextEditorModal
        isOpenModal={editorOpen}
        initialData=""
        onCloseModal={() => setEditorOpen(false)}
      />
    </div>
  );
}
