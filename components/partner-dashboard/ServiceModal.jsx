"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  InputNumber,
  Upload,
  Button,
  message,
  Tag,
  Divider,
} from "antd";
import {
  LinkOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UploadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { getActiveDestinations } from "@/services/destinationService";

const { Option } = Select;
const { TextArea } = Input;

export default function ServiceModal({
  open,
  mode,
  onCancel,
  onSubmit,
  form,
  confirmLoading,
  service,
}) {
  const [destinations, setDestinations] = useState([]);
  const [loadingDest, setLoadingDest] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (open) {
      const fetchDestinations = async () => {
        setLoadingDest(true);
        try {
          const res = await getActiveDestinations();
          setDestinations(res.data || res);
        } catch (error) {
          message.error("Không thể tải danh sách điểm đến");
        } finally {
          setLoadingDest(false);
        }
      };
      fetchDestinations();

      // const imageVal = form.getFieldValue("image");
      if (mode === "edit" && service?.image) {
        const file = [
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: service.image,
          },
        ];

        setFileList(file);
        form.setFieldsValue({ image: file });
      } else {
        setFileList([]);
      }
    }
  }, [open, mode, form]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  // Hàm render tag trạng thái
  const renderStatusTag = (status) => {
    const statusMap = {
      pending: { color: "gold", text: "Chờ phê duyệt" },
      pending_update: { color: "blue", text: "Chờ cập nhật" },
      approved: { color: "green", text: "Đang hoạt động" },
      rejected: { color: "red", text: "Bị từ chối" },
      hidden: { color: "default", text: "Đã ẩn" },
    };
    const config = statusMap[status] || { color: "blue", text: "" };
    return (
      <Tag
        color={config.color}
        style={{ fontSize: "14px", padding: "4px 12px" }}
      >
        {config.text.toUpperCase()}
      </Tag>
    );
  };

  return (
    <Modal
      title={mode === "create" ? "Đăng ký dịch vụ mới" : "Chi tiết dịch vụ"}
      open={open}
      onCancel={onCancel}
      onOk={() => form.submit()}
      width={800}
      okText={mode === "create" ? "Gửi" : "Lưu thay đổi"}
      cancelText="Đóng"
      confirmLoading={confirmLoading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ type: "other" }}
      >
        {mode === "edit" && (
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontWeight: "bold" }}>Trạng thái hiện tại:</span>
            <Form.Item name="status" noStyle>
              {renderStatusTag(form.getFieldValue("status"))}
            </Form.Item>
            <Divider style={{ margin: "12px 0" }} />
          </div>
        )}

        <Row gutter={20}>
          <Col span={12}>
            <Form.Item
              label="Tên dịch vụ"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Tour tham quan..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Điểm đến"
              name="destination"
              rules={[{ required: true, message: "Vui lòng chọn điểm đến!" }]}
            >
              <Select
                placeholder="Chọn tỉnh/thành phố"
                loading={loadingDest}
                showSearch
                optionFilterProp="children"
              >
                {destinations.map((dest) => (
                  <Option key={dest._id} value={dest._id}>
                    {dest.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Loại" name="type" rules={[{ required: true }]}>
              <Select>
                <Option value="tour">Tour</Option>
                <Option value="hotel">Khách sạn</Option>
                <Option value="restaurant">Nhà hàng</Option>
                <Option value="transport">Vận chuyển</Option>
                <Option value="experience">Trải nghiệm</Option>
                <Option value="homestay">Homestay</Option>
                <Option value="other">Khác</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Hình ảnh đại diện"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
              rules={[
                { required: mode === "create", message: "Vui lòng chọn ảnh!" },
              ]}
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={handleChange}
                beforeUpload={() => false} // Không tự động upload
                maxCount={1}
              >
                {fileList.length < 1 && (
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Link Affiliate"
              name="linkAffiliate"
              rules={[{ required: true }]}
            >
              <Input prefix={<LinkOutlined />} placeholder="https://..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Giá từ (VND)" name="priceFrom">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Giá đến (VND)" name="priceTo">
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="SĐT liên hệ" name="contactPhone">
              <Input prefix={<PhoneOutlined />} placeholder="090..." />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Địa chỉ" name="address">
              <Input
                prefix={<EnvironmentOutlined />}
                placeholder="Số nhà, tên đường..."
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Điểm nổi bật"
              name="highlights"
              tooltip="Nhấn Enter hoặc dấu phẩy để thêm mỗi điểm"
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Ví dụ: Buffet sáng miễn phí, Có hồ bơi..."
                tokenSeparators={[","]}
              ></Select>
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Mô tả dịch vụ" name="description">
              <TextArea
                rows={4}
                placeholder="Mô tả chi tiết về dịch vụ của bạn..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}
