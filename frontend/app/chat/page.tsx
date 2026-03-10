import { ChatContainer } from "@/features/message";
import Navbar from "@/components/Navbar";
import PageHeader from "@/shared/ui/PageHeader";
import { ProtectedRoute } from "@/features/auth";
import React from "react";

const Chat = (): React.JSX.Element => {
  return (
    <ProtectedRoute allowedRoles={["student", "admin", "super_admin"]}>
      <>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-10 bg-white min-h-[calc(100vh-80px)] flex flex-col gap-8">
          <PageHeader
            title="Campus Chat"
            subtitle="Connect with peers and discuss opportunities in real-time"
          />
          <ChatContainer />
        </main>
      </>
    </ProtectedRoute>
  );
};

export default Chat;
