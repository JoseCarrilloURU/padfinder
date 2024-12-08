import { RelativePathString, router } from "expo-router";
import { setTransition } from "@/components/globals";

const routerTransition = (
  method: "push" | "navigate" | "back" | "replace",
  pathname: string,
  params?: Record<string, any>
) => {
  setTransition(true);

  setTimeout(() => {
    if (method === "push") {
      router.push({ pathname: pathname as RelativePathString, params });
    } else if (method === "navigate") {
      router.navigate({ pathname: pathname as RelativePathString, params });
    } else if (method === "replace") {
      router.replace({ pathname: pathname as RelativePathString, params });
    } else {
      router.back();
    }
    setTimeout(() => {
      setTransition(false);
    }, 600);
  }, 500);
};

export default routerTransition;
