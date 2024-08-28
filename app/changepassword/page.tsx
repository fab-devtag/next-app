import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../utils/authOptions";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePasswordPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <div>Error: No email found for this session.</div>;
  }

  return (
    <div className="bg-slate-900 p-5 rounded-lg">
      <ChangePasswordForm email={session.user.email} />
    </div>
  );
};

export default ChangePasswordPage;
