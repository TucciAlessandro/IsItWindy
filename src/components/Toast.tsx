
import { useEffect, useState } from "react";
import styled from "styled-components";

const ToastButton = styled.button`
  position: relative;
  right: -1.2em;
  float: right;
  font-weight: 400;
  color: black;
  outline: none;
  opacity: 0.9;
  font-size: 20px;
  cursor: pointer;
  background: 0 0;
  border: 0;
`;

interface ToastContentProps {
  index: number;
}

const ToastContent = styled.div<ToastContentProps>`
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem 2rem;
  margin: 0.3rem;
  font-size: 15px;
  animation: toast-in-right 0.8s, fadeinout 5s forwards;
  font-weight: 400;
  position: relative;
  width: 150px;
  opacity: 0.9;
  box-shadow: 0 0 10px #999;

  @keyframes fadeinout {
    0%,
    100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }
  @keyframes toast-in-right {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

type ToastListObject = {
  id: number;
  text: string;
};

interface ToastProps {
  toastList: ToastListObject[];
  autoDelete: boolean;
  autoDeleteTime: number;
}

const Toast = ({ toastList, autoDelete, autoDeleteTime }: ToastProps) => {
  const [list, setList] = useState(toastList);

  const deleteToast = (id: number) => {
    const idx = toastList.findIndex((el) => el.id === id);
    toastList.splice(idx, 1);
    setList([...toastList]);
  };

  useEffect(() => {
    setList(toastList);
  }, [toastList, list]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      {list.map((toast, i) => (
        <ToastContent index={i} key={i}>
          <ToastButton onClick={() => deleteToast(toast.id)}>X</ToastButton>
          <p>{toast.text}</p>
        </ToastContent>
      ))}
    </>
  );
};

export { Toast };
