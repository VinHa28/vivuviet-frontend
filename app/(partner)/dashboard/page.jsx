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
  Upload,
  Avatar,
  message,
  Modal,
  Select,
  InputNumber,
  Tag,
} from "antd";

import {
  ShoppingOutlined,
  FileTextOutlined,
  UserOutlined,
  PlusOutlined,
  PhoneOutlined,
  GlobalOutlined,
  UploadOutlined,
  LinkOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { getPartnerDashboard } from "@/services/userService";
import TextEditorModal from "@/components/ui/TextEditorModal";

const { Content } = Layout;
const { Option } = Select;
const { TextArea } = Input;

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("1");

  // State quản lý Modal và Preview
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isOpenTextEditor, setIsOpenTextEditor] = useState(false);

  const [form] = Form.useForm();
  const [serviceForm] = Form.useForm();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getPartnerDashboard();
        setDashboardData(res.data);
        form.setFieldsValue(res.data.profile);

        if (res.data.profile.avatarUrl) {
          setAvatarPreview(res.data.profile.avatarUrl);
        }
      } catch (error) {
        console.error("Fetch dashboard error:", error);
        message.error("Không thể tải dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [form]);

  // Dọn dẹp bộ nhớ khi URL preview thay đổi hoặc component unmount
  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const onCloseTextEditor = () => {
    setIsOpenTextEditor(false);
  };

  // Xử lý preview logo doanh nghiệp
  const handleAvatarChange = (info) => {
    const file =
      info.fileList.length > 0
        ? info.fileList[info.fileList.length - 1].originFileObj
        : null;

    if (file) {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
      setAvatarFile(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    } else {
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  };

  // Xử lý submit Form cập nhật Profile
  const onProfileFinish = (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => formData.append(key, values[key]));
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    console.log("Profile Form Data:", values);
    message.success("Đã chuẩn bị dữ liệu cập nhật hồ sơ!");
  };

  // Xử lý submit Form tạo Service mới
  const onServiceFinish = (values) => {
    console.log("Dữ liệu dịch vụ mới:", values);
    // Sau này sẽ gọi API tạo service tại đây
    message.loading("Đang gửi yêu cầu phê duyệt dịch vụ...");
    setTimeout(() => {
      message.success(
        "Gửi yêu cầu thành công! Vui lòng đợi quản trị viên phê duyệt.",
      );
      setIsModalOpen(false);
      serviceForm.resetFields();
    }, 1000);
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a5190e] mx-auto mb-4"></div>
          <p>Đang tải dữ liệu VivuViet...</p>
        </div>
      </div>
    );
  }

  const { services, posts, stats } = dashboardData;

  const serviceColumns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
      className: "font-medium",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="blue">{type?.toUpperCase()}</Tag>,
    },
    {
      title: "Giá từ",
      dataIndex: "priceFrom",
      key: "priceFrom",
      render: (p) =>
        p ? new Intl.NumberFormat("vi-VN").format(p) + "đ" : "N/A",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          pending: "orange",
          approved: "green",
          rejected: "red",
          pendding_update: "blue",
        };
        return (
          <Tag color={colors[status] || "default"}>{status?.toUpperCase()}</Tag>
        );
      },
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Quản lý dịch vụ kinh doanh</h3>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="bg-primary border-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Tạo dịch vụ mới
            </Button>
          </div>
          <Table
            columns={serviceColumns}
            dataSource={services}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Bài viết văn hóa & du lịch</h3>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsOpenTextEditor(true)}
              className="bg-primary border-primary"
            >
              Tạo bài đăng mới
            </Button>
          </div>
          <Table
            columns={[
              { title: "Tiêu đề", dataIndex: "title", key: "title" },
              {
                title: "Ngày tạo",
                dataIndex: "createdAt",
                key: "createdAt",
                render: (d) => new Date(d).toLocaleDateString("vi-VN"),
              },
            ]}
            dataSource={posts}
            rowKey="_id"
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
          onFinish={onProfileFinish}
          className="max-w-3xl mt-4"
        >
          <Row gutter={24}>
            <Col
              span={24}
              className="mb-8 flex items-center gap-6 p-4 bg-gray-50 rounded-lg"
            >
              <Avatar
                size={120}
                src={avatarPreview}
                icon={<UserOutlined />}
                className="border-2 border-white shadow-md"
              />
              <div>
                <h4 className="font-bold text-base mb-2">Logo thương hiệu</h4>
                <Upload
                  showUploadList={false}
                  beforeUpload={() => false}
                  onChange={handleAvatarChange}
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                </Upload>
                <p className="text-gray-400 text-xs mt-2 italic">
                  * Khuyên dùng ảnh vuông, dung lượng dưới 2MB
                </p>
              </div>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Tên doanh nghiệp"
                name="businessName"
                rules={[{ required: true }]}
              >
                <Input
                  prefix={<ShoppingOutlined />}
                  placeholder="Tên hiển thị trên hệ thống"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input
                  prefix={<PhoneOutlined />}
                  placeholder="Số hotline liên hệ"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Website (nếu có)" name="website">
                <Input
                  prefix={<GlobalOutlined />}
                  placeholder="https://yourwebsite.com"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email đối tác (Cố định)" name="email">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="bg-[#a5190e] mt-4"
          >
            Lưu thay đổi hồ sơ
          </Button>
        </Form>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="p-8 max-w-7xl mx-auto w-full">
        {/* Phần 4 Card thống kê đã cập nhật */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card
              variant={false}
              className="border-l-4 border-blue-500 shadow-sm"
            >
              <Statistic
                title="Dịch vụ"
                value={stats.totalServices}
                prefix={<ShoppingOutlined />}
                suffix={
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    (Chờ duyệt: {stats.pendingServices})
                  </span>
                }
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              variant={false}
              className="border-l-4 border-green-500 shadow-sm"
            >
              <Statistic
                title="Bài viết"
                value={stats.totalPosts}
                prefix={<FileTextOutlined />}
                suffix={
                  <span className="text-xs text-gray-400 font-normal ml-2">
                    (Mới: {posts.length})
                  </span>
                }
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              variant={false}
              className="border-l-4 border-orange-500 shadow-sm"
            >
              <Statistic
                title="Tổng lượt xem"
                value={stats.totalViews || 0}
                precision={0}
                prefix={<GlobalOutlined />}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card
              variant={false}
              className="border-l-4 border-purple-500 shadow-sm bg-gradient-to-r from-white to-purple-50 h-full"
            >
              <div className="ant-statistic">
                <div className="ant-statistic-title">Gói thành viên</div>
                <div className="ant-statistic-content flex items-center">
                  <span className="ant-statistic-content-value">
                    {/* Giả định dữ liệu gói nằm trong profile hoặc stats */}
                    <Tag
                      color="gold"
                      className="text-sm px-3 py-1 font-bold uppercase"
                    >
                      {dashboardData.profile?.tier || "Đối tác chiến lược"}
                    </Tag>
                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Card className="shadow-sm border-none overflow-hidden rounded-xl">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            className="p-2"
          />
        </Card>

        {/* Modal tạo Service dựa trên Service Model */}
        <Modal
          title={
            <div className="text-lg border-b pb-2">
              Đăng ký dịch vụ mới cho VivuViet
            </div>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => serviceForm.submit()}
          okText="Gửi yêu cầu phê duyệt"
          cancelText="Hủy bỏ"
          width={750}
          okButtonProps={{ className: "bg-[#a5190e]" }}
        >
          <Form
            form={serviceForm}
            layout="vertical"
            onFinish={onServiceFinish}
            initialValues={{ type: "other" }}
            className="mt-4"
          >
            <Row gutter={16}>
              <Col span={16}>
                <Form.Item
                  label="Tên dịch vụ"
                  name="name"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên dịch vụ!" },
                  ]}
                >
                  <Input placeholder="Ví dụ: Tour tham quan vịnh Hạ Long" />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Loại hình"
                  name="type"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Option value="tour">Tour du lịch</Option>
                    <Option value="hotel">Khách sạn/Hotel</Option>
                    <Option value="restaurant">Nhà hàng/Ẩm thực</Option>
                    <Option value="transport">Vận chuyển</Option>
                    <Option value="experience">Trải nghiệm/Hoạt động</Option>
                    <Option value="homestay">Homestay</Option>
                    <Option value="other">Khác</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Link Affiliate (Link liên kết đặt chỗ)"
                  name="linkAffiliate"
                  rules={[
                    { required: true, message: "Vui lòng nhập link liên kết!" },
                  ]}
                  tooltip="Link dẫn đến trang đặt dịch vụ của đối tác"
                >
                  <Input
                    prefix={<LinkOutlined />}
                    placeholder="https://partner-booking.com/service-id"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Giá thấp nhất (VNĐ)" name="priceFrom">
                  <InputNumber
                    className="w-full"
                    formatter={(val) =>
                      `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Số điện thoại liên hệ (Dịch vụ)"
                  name="contactPhone"
                >
                  <Input
                    prefix={<PhoneOutlined />}
                    placeholder="Để trống nếu lấy theo hồ sơ"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ diễn ra dịch vụ" name="address">
                  <Input
                    prefix={<EnvironmentOutlined />}
                    placeholder="Số nhà, đường, tỉnh thành..."
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả dịch vụ" name="description">
                  <TextArea
                    rows={4}
                    placeholder="Những điểm nổi bật khiến khách hàng nên chọn dịch vụ của bạn..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <div className="bg-blue-50 p-3 rounded flex items-start gap-2">
              <InfoCircleOutlined className="text-blue-500 mt-1" />
              <span className="text-xs text-blue-700">
                {` Sau khi gửi, quản trị viên sẽ kiểm duyệt nội dung trong vòng
                24h. Bạn có thể theo dõi trạng thái tại tab "Dịch vụ của tôi".`}
              </span>
            </div>
          </Form>
        </Modal>
      </Content>

      <TextEditorModal
        isOpenModal={isOpenTextEditor}
        initialData={""}
        onCloseModal={onCloseTextEditor}
      />
    </Layout>
  );
}
