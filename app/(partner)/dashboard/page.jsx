"use client";

import { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Statistic,
  Row,
  Col,
  Tabs,
  Table,
  Button,
  Form,
  Input,
} from "antd";

import {
  ShoppingOutlined,
  FileTextOutlined,
  UserOutlined,
  PlusOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { getPartnerDashboard } from "@/services/userService";


const { Content } = Layout;

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");

  const [form] = Form.useForm();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getPartnerDashboard();
        setDashboardData(res.data);
        form.setFieldsValue(res.data.profile);
      } catch (error) {
        console.error("Fetch dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [form]);

  if (loading || !dashboardData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading dashboard...
      </div>
    );
  }

  const { profile, services, posts, stats } = dashboardData;

  const serviceColumns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá từ",
      dataIndex: "priceFrom",
      key: "priceFrom",
      render: (p) =>
        p ? new Intl.NumberFormat("vi-VN").format(p) + "đ" : "Chưa cập nhật",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
  ];

  const postColumns = [
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) =>
        d ? new Date(d).toLocaleDateString("vi-VN") : "Không rõ",
    },
  ];

  const tabItems = [
    {
      key: "1",
      label: (
        <span>
          <ShoppingOutlined /> Dịch vụ của tôi
        </span>
      ),
      children: (
        <>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Danh sách dịch vụ đang kinh doanh</h3>
          </div>

          <Table
            columns={serviceColumns}
            dataSource={services}
            rowKey="_id"
            pagination={false}
          />
        </>
      ),
    },
    {
      key: "2",
      label: (
        <span>
          <FileTextOutlined /> Bài viết & Tin tức
        </span>
      ),
      children: (
        <>
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">
              Quản lý bài đăng văn hóa & du lịch
            </h3>

            <Button type="dashed" icon={<PlusOutlined />}>
              Tạo bài viết mới
            </Button>
          </div>

          <Table
            columns={postColumns}
            dataSource={posts}
            rowKey="_id"
            pagination={false}
          />
        </>
      ),
    },
    {
      key: "3",
      label: (
        <span>
          <UserOutlined /> Hồ sơ đối tác
        </span>
      ),
      children: (
        <Form
          layout="vertical"
          form={form}
          className="max-w-2xl mt-4"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Tên doanh nghiệp" name="businessName">
                <Input prefix={<ShoppingOutlined />} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Website doanh nghiệp" name="website">
                <Input prefix={<GlobalOutlined />} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Fanpage" name="fanpage">
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Email liên hệ (Không thể thay đổi)"
                name="email"
              >
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" className="bg-[#a5190e]">
            Cập nhật thông tin
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Content className="p-6 max-w-7xl mx-auto w-full">

        {/* Stats */}
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Tổng dịch vụ"
                value={stats.totalServices}
                prefix={<ShoppingOutlined />}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Bài viết"
                value={stats.totalPosts}
                prefix={<FileTextOutlined />}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Dịch vụ hoạt động"
                value={stats.activeServices}
              />
            </Card>
          </Col>

          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Dịch vụ chờ duyệt"
                value={stats.pendingServices}
              />
            </Card>
          </Col>
        </Row>

        {/* Tabs */}
        <Card className="shadow-sm border-none min-h-[500px]">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
          />
        </Card>

      </Content>
    </Layout>
  );
}