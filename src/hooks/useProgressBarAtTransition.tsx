"use client"; 
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useProgressBarAtTransition = (): void => {
  const pathname = usePathname(); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      NProgress.start();
    }

    const timeout = setTimeout(() => {
      setLoading(false);
      NProgress.done();
    }, 500); // 遷移完了後に少し待ってから終了

    return () => clearTimeout(timeout);
  }, [pathname]);
};
