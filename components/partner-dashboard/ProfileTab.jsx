"use client";

import { Form, Input, Row, Col, Avatar, Upload, Button, Card } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  ShoppingOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";

export default function ProfileTab({ profile }) {
  const [form] = Form.useForm();

  return (
    <Form layout="vertical" form={form} initialValues={profile}>
      <Card>
        <Row gutter={32} align="middle">

          <Col
            xs={24}
            md={6}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Avatar
              size={120}
              src={profile?.avatarUrl}
              icon={<UserOutlined />}
            />

            <Upload beforeUpload={() => false} showUploadList={false}>
              <Button icon={<UploadOutlined />}>
                Đổi logo
              </Button>
            </Upload>
          </Col>

          <Col xs={24} md={18}>
            <Row gutter={16}>

              <Col span={12}>
                <Form.Item
                  label="Tên doanh nghiệp"
                  name="businessName"
                  rules={[{ required: true }]}
                >
                  <Input prefix={<ShoppingOutlined />} />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item label="Số điện thoại" name="phone">
                  <Input prefix={<PhoneOutlined />} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Website" name="website">
                  <Input prefix={<GlobalOutlined />} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Email" name="email">
                  <Input disabled />
                </Form.Item>
              </Col>

            </Row>

            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>

          </Col>

        </Row>
      </Card>
    </Form>
  );
}