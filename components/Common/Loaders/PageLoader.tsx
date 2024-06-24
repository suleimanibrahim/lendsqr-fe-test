"use client";
import React, { useEffect } from "react";
import "./pageloader.css";
import { usePageLoader } from "@/context/PageLoaderContext/Provider";

const PageLoader = () => {
  const { show, updateShow } = usePageLoader();

  useEffect(() => {
    function isAnchorOfCurrentUrl(currentUrl: string, newUrl: string) {
      const currentUrlObj = new URL(currentUrl);
      const newUrlObj = new URL(newUrl);
      // Compare hostname, pathname, and search parameters
      if (
        currentUrlObj.hostname === newUrlObj.hostname &&
        currentUrlObj.pathname === newUrlObj.pathname &&
        currentUrlObj.search === newUrlObj.search
      ) {
        // Check if the new URL is just an anchor of the current URL page
        const currentHash = currentUrlObj.hash;
        const newHash = newUrlObj.hash;
        return (
          currentHash !== newHash &&
          currentUrlObj.href.replace(currentHash, "") ===
            newUrlObj.href.replace(newHash, "")
        );
      }
      return false;
    }

    function findClosestAnchor(
      element: HTMLElement | null
    ): HTMLAnchorElement | null {
      while (element && element.tagName.toLowerCase() !== "a") {
        element = element.parentElement;
      }
      return element as HTMLAnchorElement;
    }
    function handleClick(event: MouseEvent) {
      try {
        const target = event.target as HTMLElement;
        const anchor = findClosestAnchor(target);
        const newUrl = anchor?.href;
        if (newUrl) {
          const currentUrl = window.location.href;
          const isExternalLink =
            (anchor as HTMLAnchorElement).target === "_blank";
          const isBlob = newUrl.startsWith("blob:");
          const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);
          if (
            newUrl === currentUrl ||
            isAnchor ||
            isExternalLink ||
            isBlob ||
            event.ctrlKey
          ) {
            updateShow(false);
          } else {
            updateShow(true);

            (function (history: History) {
              const pushState = history.pushState;
              history.pushState = function () {
                updateShow(false);
                return pushState.apply(history, arguments as any);
              };
            })(window.history);
          }
        }
      } catch (err) {
        updateShow(false);
      }
    }

    // Add the global click event listener
    document.addEventListener("click", handleClick);

    // Clean up the global click event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return show ? <Loader /> : null;
};

export default PageLoader;

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};
