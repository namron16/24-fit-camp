import { useState, useEffect, useTransition } from "react";

const usePageTransition = () => {
  const [isPending, startTransition] = useTransition();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setTimeout(() => setShowContent(true), 500);
    });
  }, []);

  return { isPending, showContent };
};

export default usePageTransition;
