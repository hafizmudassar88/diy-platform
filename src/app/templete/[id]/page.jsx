"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useTemplate from "@/hooks/useTemplate";
import TemplateHomePage from "./home/page";
import { useUser } from "@/contexts/UserContext";

const UserTemplate = () => {
  const { id } = useParams();
  const router = useRouter();
  const { templateData, loading, error } = useTemplate(id);
  const { user, isAuthenticated } = useUser();

  useEffect(() => {
    // Wait for template data and loading to complete
    if (!loading && templateData) {
      const isApproved = templateData.status === "APPROVED";

      // If user is not logged in
      if (!isAuthenticated) {
        // Guests can only access APPROVED templates
        if (!isApproved) {
          router.push("/unauthorized");
        }
        return;
      }

      // If user is logged in
      const isOwner = templateData.createdBy?._id === user?.id;
      const isAdmin = ["ADMIN", "SUPER_ADMIN"].includes(user?.role);

      // If not approved and not owner/admin => block
      if (!isApproved && !isOwner && !isAdmin) {
        router.push("/unauthorized");
      }
    }
  }, [templateData, loading, user, isAuthenticated, router]);

  if (loading || (!isAuthenticated && templateData?.status !== "APPROVED")) {
    return <div>Loading...</div>;
  }

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white">
      <TemplateHomePage data={templateData} />
    </div>
  );
};

export default UserTemplate;
