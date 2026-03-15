"use client";

import { useEffect, useState } from "react";
import { Layout, Card, Tabs, message } from "antd";
import {
  ShoppingOutlined,
  FileTextOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { getPartnerDashboard } from "@/services/userService";
import ServicesTab from "@/components/partner-dashboard/ServicesTab";
import PostsTab from "@/components/partner-dashboard/PostsTab";
import ProfileTab from "@/components/partner-dashboard/ProfileTab";
import DashboardStats from "@/components/partner-dashboard/DashboardStats";

const { Content } = Layout;

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPartnerDashboard();
        setData(res.data);
      } catch (err) {
        console.error(err);
        message.error("Không thể tải dashboard");
      }
    };

    fetchData();
  }, []);

  if (!data) return null;

  const { stats, profile } = data;

  const tabItems = [
    {
      key: "1",
      label: (
        <span>
          <ShoppingOutlined /> Dịch vụ của tôi
        </span>
      ),
      children: <ServicesTab />,
    },
  ];

  // chỉ thêm tab bài viết nếu là premium
  if (profile?.partnerTier === "premium") {
    tabItems.push({
      key: "2",
      label: (
        <span>
          <FileTextOutlined /> Bài viết
        </span>
      ),
      children: <PostsTab />,
    });
  }

  tabItems.push({
    key: "3",
    label: (
      <span>
        <UserOutlined /> Hồ sơ đối tác
      </span>
    ),
    children: <ProfileTab profile={profile} />,
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: 32,
          margin: "0",
          background: "#fff",
        }}
      >
        <DashboardStats stats={stats} profile={profile} />

        <Card style={{ width: "100%", marginTop: 32 }}>
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
