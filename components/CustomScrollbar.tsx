// components/CustomScrollbar.tsx
"use client";

import { useEffect } from "react";

export default function CustomScrollbar() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        background: transparent;
      }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #6366f1, #8b5cf6);
        border-radius: 10px;
        transition: background 0.3s ease;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #4f46e5, #7c3aed);
      }
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}