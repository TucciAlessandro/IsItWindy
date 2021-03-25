import { useEffect, useState } from "react";
import { FramerDragEvent, Slider } from "../components/Slider";
import { firebase } from "./../realtimedb/firebase";
import { PanInfo } from "framer-motion";
import { useHistory } from "react-router-dom";

const AdminLift = () => {
  const history = useHistory();
  const [isWindyToggle, setIsWindyToggle] = useState();

  useEffect(() => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
    isWindyDb.onSnapshot((doc) => {
      const value = doc.data();
      value && setIsWindyToggle(value.isWindy);
    });
  }, []);

  const updateIsWindy = (newValue: boolean) => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
    isWindyDb.update({ lift: newValue });
  };
  const handleDragEnd = (_evt: FramerDragEvent, panInfo: PanInfo) => {
    const width = window.innerWidth;
    const offSet = panInfo.offset;
    const x = offSet.x;
    const shouldUpdate = Math.abs(x) > width / 4;
    const isWindy = x > 0;

    shouldUpdate && updateIsWindy(isWindy);
    console.log(isWindy);
    // history.push("/");
  };
  return (
    <>
      <Slider type="Lift" onDragEnd={handleDragEnd} />
    </>
  );
};

export { AdminLift };
