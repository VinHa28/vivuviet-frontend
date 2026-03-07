"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";

export default function StatusResult({
  status = "success",
  title,
  message,
  actionLabel,
  onAction,
}) {
  const isSuccess = status === "success";

  return (
    <div className="text-center py-4">
      <div
        className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${isSuccess ? "bg-green-100 text-green-600" : "bg-red-100 text-primary"}`}
      >
        {isSuccess ? <CheckCircle2 size={48} /> : <AlertCircle size={48} />}
      </div>

      <h2 className="text-2xl font-bold text-text-primary mb-2">{title}</h2>
      <p className="text-text-secondary mb-8">{message}</p>

      <button
        onClick={onAction}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all active:scale-95 shadow-md ${isSuccess ? "bg-secondary hover:bg-[#eab308]" : "bg-primary hover:bg-[#8e150c]"}`}
      >
        {actionLabel}
      </button>
    </div>
  );
}
