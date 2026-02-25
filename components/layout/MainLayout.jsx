import React from 'react';
import FloatingChat from "@/components/ui/FloatingChat"; 

export default function MainLayout({ children }) {
  return (
    <div>
      {children}
<FloatingChat />
    </div>
  )
}