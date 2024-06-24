import { usePageLoader } from "@/context/PageLoaderContext/Provider";
import { useRouter as useBaseRouter } from "next/navigation";

export function useLenSqrRouter() {
  const router = useBaseRouter();
  const { updateShow } = usePageLoader();

  const { push, replace, back, forward } = router;

  router.push = async (...args: Parameters<typeof push>) => {
    updateShow(true);
    return push(...args);
  };
  router.replace = async (...args: Parameters<typeof replace>) => {
    updateShow(true);
    return replace(...args);
  };
  router.back = async () => {
    updateShow(true);
    return back();
  };
  router.forward = async () => {
    updateShow(true);
    return forward();
  };

  return router;
}
