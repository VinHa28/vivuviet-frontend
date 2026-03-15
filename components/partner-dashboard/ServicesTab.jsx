"use client";

import { useCallback, useEffect, useState } from "react";
// Thêm Popconfirm để xác nhận trước khi xóa
import { Table, Button, Input, Form, message, Tag, Popconfirm } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import ServiceModal from "./ServiceModal";
import {
  createPartnerServiceApi,
  deleteService,
  getMyServicesApi,
  updateService,
} from "@/services/partnerService";

export default function ServicesTab({}) {
  const [services, setServices] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [loading, setLoading] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form] = Form.useForm();

  // Fetch Services
  const fetchServices = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getMyServicesApi();
      setServices(res);
    } catch (error) {
      message.error(
        "Không thể tải danh sách dịch vụ: " + (error.message || "Lỗi hệ thống"),
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleCreate = () => {
    setModalMode("create");
    form.resetFields();
    setModalOpen(true);
  };

  const handleEdit = (record) => {
    setModalMode("edit");
    const { image, ...rest } = record;

    form.setFieldsValue({ ...rest, destination: record.destination?._id });
    setEditingService(record);
    setModalOpen(true);
  };

  // Hàm xử lý xóa
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await deleteService(id);
      message.success("Đã xóa dịch vụ thành công");
      fetchServices();
    } catch (error) {
      message.error("Không thể xóa dịch vụ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Append các trường cơ bản
      formData.append("name", values.name);
      formData.append("type", values.type);
      formData.append("linkAffiliate", values.linkAffiliate);
      formData.append("priceFrom", values.priceFrom || 0);
      formData.append("priceTo", values.priceTo || 0);
      formData.append("address", values.address || "");
      formData.append("contactPhone", values.contactPhone || "");
      formData.append("description", values.description || "");
      formData.append("destination", values.destination);

      // Xử lý highlights
      if (values.highlights && Array.isArray(values.highlights)) {
        values.highlights.forEach((item) =>
          formData.append("highlights", item),
        );
      }

      if (values.image && values.image[0]?.originFileObj) {
        formData.append("image", values.image[0].originFileObj);
      }

      if (modalMode === "create") {
        await createPartnerServiceApi(formData);
        message.success("Yêu cầu tạo dịch vụ đã được gửi.");
      } else {
        const res = await updateService(editingService._id, formData);
        if (res.success) {
          message.success("Cập nhật dịch vụ thành công.");
        }
      }

      setModalOpen(false);
      fetchServices();
      form.resetFields();
    } catch (error) {
      message.error(error.message || "Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      filteredValue: [searchText],
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Loại",
      dataIndex: "type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Giá từ",
      dataIndex: "priceFrom",
      render: (price) => `${price?.toLocaleString()} VND`,
    },
    {
      title: "Địa điểm",
      dataIndex: "destination",
      key: "destination",
      render: (destination) => destination?.name || "N/A",
    },
    {
      title: "Giá (VND)",
      key: "price",
      render: (_, record) => (
        <span>
          {record.priceFrom?.toLocaleString()} -{" "}
          {record.priceTo?.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      key: "views",
      sorter: (a, b) => a.views - b.views,
      render: (views) => (
        <span>
          <EyeOutlined style={{ marginRight: 4 }} />
          {views || 0}
        </span>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        let text = status?.toUpperCase();
        if (status === "approved") color = "green";
        if (status === "pending") color = "gold";
        if (status === "rejected") color = "red";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Button type="link" onClick={() => handleEdit(record)}>
            Chi tiết
          </Button>

          <Popconfirm
            title="Xóa dịch vụ"
            description="Bạn có chắc chắn muốn xóa dịch vụ này không?"
            onConfirm={() => handleDelete(record._id)}
            okText="Có"
            cancelText="Không"
            okButtonProps={{ danger: true, loading: loading }}
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
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
        <Input
          prefix={<SearchOutlined />}
          placeholder="Tìm dịch vụ"
          style={{ width: 300 }}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Tạo dịch vụ
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={services}
        rowKey="_id"
        loading={loading}
      />

      <ServiceModal
        open={modalOpen}
        mode={modalMode}
        form={form}
        confirmLoading={loading}
        onCancel={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        service={editingService}
        fetchServices={fetchServices}
      />
    </div>
  );
}
