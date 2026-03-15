"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, Button, Tag, Input, Select, Modal, Space, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Search, Edit, Trash2 } from "lucide-react";

import TextEditorModal from "@/components/ui/TextEditorModal";
import ImageModal from "@/components/ui/ImageModal";
import { getPartnerPosts } from "@/services/partnerService";

const { Option } = Select;

export default function PostsTab() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGallery, setCurrentGallery] = useState([]);

  const [currentPost, setCurrentPost] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getPartnerPosts();
      setPosts(res.data);
    } catch (error) {
      console.error("Không thể tải bài viết", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      // await deletePartnerPost(id);
      message.success("Xóa bài viết thành công");
      fetchPosts();
    } catch (error) {
      message.error("Xóa thất bại");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id) => {
    Modal.confirm({
      title: "Xóa bài viết?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Xác nhận",
      cancelText: "Hủy",
      okButtonProps: { danger: true },
      onOk: () => handleDeletePost(id),
    });
  };

  const filteredPosts = useMemo(() => {
    let data = [...posts];

    if (searchText) {
      data = data.filter((p) =>
        p.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      data = data.filter((p) => p.status === statusFilter);
    }

    return data;
  }, [posts, searchText, statusFilter]);

  const columns = [
    {
      title: "Tiêu đề",
      key: "title",
      render: (_, record) => (
        <div className="font-semibold text-gray-800">
          {record.title || "N/A"}
        </div>
      ),
    },
    {
      title: "Banner",
      key: "banner",
      render: (_, record) =>
        record.banner?.image ? (
          <img
            src={record.banner.image}
            className="w-24 rounded"
            alt={record.banner?.alt}
          />
        ) : (
          <span className="text-gray-400">—</span>
        ),
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (_, record) => {
        const config = {
          pending: { color: "warning", text: "Chờ duyệt" },
          approved: { color: "success", text: "Đã duyệt" },
          rejected: { color: "error", text: "Từ chối" },
        };
        return (
          <Tag color={config[record.status]?.color}>
            {config[record.status]?.text ?? record.status}
          </Tag>
        );
      },
    },
    {
      title: "Ngày viết",
      key: "postedDate",
      render: (_, record) =>
        record.postedDate
          ? new Date(record.postedDate).toLocaleDateString("vi-VN")
          : new Date(record.createdAt).toLocaleDateString("vi-VN"),
    },
    {
      title: "Thư viện",
      key: "gallery",
      render: (_, record) =>
        record.gallery?.length ? (
          <button
            className="text-blue-500 hover:underline"
            onClick={() => {
              setCurrentGallery(record.gallery);
              setIsGalleryOpen(true);
            }}
          >
            {record.gallery.length} ảnh
          </button>
        ) : (
          <span>0</span>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            icon={<Edit size={14} />}
            onClick={() => {
              setCurrentPost(record);
              setEditorOpen(true);
            }}
          >
            Chi tiết
          </Button>
          <Button
            size="small"
            danger
            icon={<Trash2 size={14} />}
            onClick={() => confirmDelete(record._id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Bài viết</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setCurrentPost(null);
            setEditorOpen(true);
          }}
        >
          Tạo bài viết
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4">
        <Input
          placeholder="Tìm kiếm bài viết..."
          prefix={<Search size={16} />}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ width: 280 }}
        />
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          style={{ width: 180 }}
        >
          <Option value="all">Tất cả trạng thái</Option>
          <Option value="pending">Chờ duyệt</Option>
          <Option value="approved">Đã duyệt</Option>
          <Option value="rejected">Từ chối</Option>
        </Select>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        dataSource={filteredPosts}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 8 }}
      />

      {/* Image Gallery Modal */}
      <ImageModal
        isGalleryOpen={isGalleryOpen}
        setIsGalleryOpen={setIsGalleryOpen}
        currentGallery={currentGallery}
      />

      {/* Editor Modal */}
      <TextEditorModal
        isOpenModal={editorOpen}
        initialData={currentPost}
        onCloseModal={() => {
          setEditorOpen(false);
          setCurrentPost(null);
          fetchPosts();
        }}
      />
    </div>
  );
}