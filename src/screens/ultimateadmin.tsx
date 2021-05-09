import { useEffect, useState } from "react";
import styled from "styled-components";
import { FramerDragEvent, Slider } from "../components/Slider";
import { firebase } from "./../realtimedb/firebase";
import { PanInfo } from "framer-motion";
import { Toast } from "../components/Toast";
import { useScreenSize } from "../hooks/useScreenSize";

const ToastDiv = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const toastList: any = [];

const createId = () => Math.floor(Math.random() * 100 + 1);

const UltimateAdmin = () => {
  const [list, setList] = useState(toastList);
  const [isWindyToggle, setIsWindyToggle] = useState();
  const [isLift, setIsLift] = useState();
  const { screenSize } = useScreenSize();
  const isMobile = screenSize === "small" || screenSize === "medium";

  useEffect(() => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
    const unsubscribe = isWindyDb.onSnapshot((doc) => {
      const value = doc.data();
      value && setIsWindyToggle(value.isWindy);
      value && setIsLift(value.lift);
    });

    return unsubscribe;
  }, []);

  const updateIsWindy = (newValue: boolean) => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
    isWindyDb.update({ isWindy: newValue, date: new Date() });
  };
  const updateIsLift = (newValue: boolean) => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
    isWindyDb.update({ lift: newValue, date: new Date() });
  };

  const setListAndCleanUp = (listItem: any) => {
    setList([...list, listItem]);
    setTimeout(() => {
      setList((curr: any) => {
        const newState = [...curr];
        console.log(listItem);
        return newState.filter((el) => el.id !== listItem.id);
      });
    }, 4000);
  };

  const handleWindyDragEnd = (_evt: FramerDragEvent, panInfo: PanInfo) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const offSet = panInfo.offset;
    const x = offSet.x;
    const shouldUpdate = isMobile
      ? Math.abs(x) > width / 3 && Math.abs(x) > height / 3
      : Math.abs(x) > width / 3;

    const isWindy = x > 0;
    if (shouldUpdate) {
      isWindy
        ? setListAndCleanUp({ id: createId(), text: "Lesson enabled" })
        : setListAndCleanUp({ id: createId(), text: "Lesson disabled" });
      updateIsWindy(isWindy);
    }
  };
  const handleLiftDragEnd = (_evt: FramerDragEvent, panInfo: PanInfo) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const offSet = panInfo.offset;
    const x = offSet.x;
    const shouldUpdate = isMobile
      ? Math.abs(x) > width / 3 && Math.abs(x) > height / 3
      : Math.abs(x) > width / 3;
    const isLift = x > 0;

    if (shouldUpdate) {
      isLift
        ? setListAndCleanUp({ id: createId(), text: "Lift enabled" })
        : setListAndCleanUp({ id: createId(), text: "Lift disabled" });
      updateIsLift(isLift);
    }
  };
  const deleteToast = (id: number) => {
    const idx = list.findIndex((el: any) => el.id === id);
    const newToast = [...list];
    newToast.splice(idx, 1);
    setList([...newToast]);
  };
  return (
    <>
      <ToastDiv>
        <Toast
          setToastList={setList}
          autoDelete={true}
          autoDeleteTime={4000}
          toastList={list}
          deleteToast={deleteToast}
        />
      </ToastDiv>

      <Slider
        isWindy={isWindyToggle}
        type1="LESSONS"
        type2="LIFTS"
        onLiftDragEnd={handleLiftDragEnd}
        onLessonDragEnd={handleWindyDragEnd}
      />
    </>
  );
};

export { UltimateAdmin };
