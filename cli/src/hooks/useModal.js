import { useState } from "react";

export const useModal = () => {
  const [msg, setMsg] = useState("");
  const [isShowing, setShowing] = useState(false);

  const open = (msg) => {
    setMsg(msg);
    setShowing(true);
    setTimeout(() => {
      setShowing(false);
    }, 3000);
  };
  const hide = (msg) => {
    setShowing(false);
  };
  return { isShowing, hide, open, msg };
};
