import { useDispatch, useSelector, useStore } from "react-redux";
import type { RootState, AppDispatch, AppStore } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// Custom useAppSelector with debug
export const useAppSelector = <T,>(selector: (state: RootState) => T): T => {
  const result = useSelector.withTypes<RootState>()(selector);

  // Debug specific selector calls
  if (selector.toString().includes("carts")) {
    console.log("🔍 useAppSelector carts called, result:", result);
  }

  return result;
};
export const useAppStore = useStore.withTypes<AppStore>();
