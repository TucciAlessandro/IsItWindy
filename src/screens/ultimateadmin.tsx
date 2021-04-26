import { useEffect, useState } from "react";
import styled from "styled-components";
import { FramerDragEvent, Slider } from "../components/Slider";
import { firebase } from "./../realtimedb/firebase";
import { PanInfo } from "framer-motion";
import { Toast } from "../components/Toast";

const ToastDiv = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const toastList: any = [];
const id = Math.floor(Math.random() * 100 + 1);

const UltimateAdmin = () => {
  const [list, setList] = useState(toastList);
  const [isWindyToggle, setIsWindyToggle] = useState();
  const [isLift, setIsLift] = useState();
  const [isToastOpen, setIsToastOpen] = useState(false);

  useEffect(() => {
    setList(toastList);
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
  }, [toastList]);

  const toggleModal = () => {
    setIsToastOpen(!isToastOpen);
  };

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

  const handleWindyDragEnd = (_evt: FramerDragEvent, panInfo: PanInfo) => {
    const width = window.innerWidth;
    const offSet = panInfo.offset;
    const x = offSet.x;
    const shouldUpdate = Math.abs(x) > width / 3;
    const isWindy = x > 0;
    isWindy
      ? toastList.push({ id: id, text: "Lessons enabled" })
      : toastList.push({ id: id, text: "Lessons disabled" });
    if (shouldUpdate) {
      updateIsWindy(isWindy);
      setIsToastOpen(!isToastOpen);
    }
  };
  const handleLiftDragEnd = (_evt: FramerDragEvent, panInfo: PanInfo) => {
    const width = window.innerWidth;
    const offSet = panInfo.offset;
    const x = offSet.x;
    const shouldUpdate = Math.abs(x) > width / 3;
    const isLift = x > 0;

    isLift
      ? toastList.push({ id: id, text: "Litf enabled" })
      : toastList.push({ id: id, text: "Lift disabled" });
    if (shouldUpdate) {
      updateIsLift(isLift);
      setIsToastOpen(!isToastOpen);
    }
  };

  return (
    <>
      <ToastDiv>
        <Toast autoDelete={false} autoDeleteTime={4000} toastList={toastList} />
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
