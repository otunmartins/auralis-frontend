import { useAppDispatch } from "@/lib/hooks";
import { fetchUserThunk } from "@/store/thunks/authThunks";
import { useEffect } from "react";

const AppWrapper = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      //   await dispatch(fetchUserThunk());
    })();
  }, []);
  return null;
};

export default AppWrapper;
