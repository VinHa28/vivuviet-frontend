import { Row, Col, Card, Statistic, Tag, Button } from "antd";
import {
  ShoppingOutlined,
  FileTextOutlined,
  GlobalOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";

export default function DashboardStats({ stats, profile }) {
  const tier = profile?.partnerTier;

  const tierLabel = {
    basic: "Đối tác cơ bản",
    standard: "Đối tác tiêu chuẩn",
    premium: "Đối tác chiến lược",
  };

  const tierColor = {
    basic: "default",
    standard: "blue",
    premium: "gold",
  };

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Dịch vụ"
            value={stats.totalServices}
            prefix={<ShoppingOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Bài viết"
            value={stats.totalPosts}
            prefix={<FileTextOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card>
          <Statistic
            title="Tổng lượt xem"
            value={stats.totalViews}
            prefix={<GlobalOutlined />}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} lg={6}>
        <Card style={{ height: "100%" }}>
          <div className="flex flex-col gap-3">
            <span className="ant-statistic-title">Gói hiện tại</span>

            <Tag
              color={tierColor[tier]}
              style={{ width: "fit-content", fontSize: 16 }}
            >
              {tierLabel[tier]}
            </Tag>

            {tier !== "premium" && (
              <Button
                type="primary"
                icon={<ArrowUpOutlined />}
                size="small"
                style={{ width: "fit-content" }}
              >
                Nâng cấp gói
              </Button>
            )}
          </div>
        </Card>
      </Col>
    </Row>
  );
}
