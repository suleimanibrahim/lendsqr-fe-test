"use client";
import { usePathname } from "next/navigation";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type PageLoaderContextProps = {
  show: boolean;
  updateShow: (show: boolean) => void;
};
const PageLoaderContext = createContext({} as PageLoaderContextProps);

export const PageLoaderProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [pathname]);

  const updateShow = useCallback((show: boolean) => setShow(show), []);
  return (
    <PageLoaderContext.Provider value={{ show, updateShow }}>
      {children}
    </PageLoaderContext.Provider>
  );
};

export const usePageLoader = () => {
  return useContext(PageLoaderContext);
};
