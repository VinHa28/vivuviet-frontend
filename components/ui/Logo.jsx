import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <div className="">
      <Link
        href="/"
        className="text-primary text-[50px] font-script-1 leading-none"
      >
        VivuViet
      </Link>
    </div>
  );
}
