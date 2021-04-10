import { useEffect, useState } from "react";
import { FramerDragEvent, Slider } from "../components/Slider";
import { firebase } from "./../realtimedb/firebase";
import { motion, PanInfo } from "framer-motion";
import { useHistory } from "react-router-dom";
import { Modal } from "../components/Modal";

const Admin = () => {
  const history = useHistory();
  const [isWindyToggle, setIsWindyToggle] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState();

  useEffect(() => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
    const unsubscribe = isWindyDb.onSnapshot((doc) => {
      const value = doc.data();
      value && setIsWindyToggle(value.isWindy);
      value && setDate(value.date);
    });

    return unsubscribe;
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    history.push("/adminlift");
  };

  function dateToTimestamp(date: Date) {
    const seconds = date.getTime();
    return { seconds: seconds, nanoseconds: 0 };
  }

  const updateIsWindy = (newValue: boolean) => {
    const timestamp = dateToTimestamp(new Date());

    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");

    isWindyDb.update({ isWindy: newValue, date:  new Date()  });
  };
  const handleDragEnd = (_evt: FramerDragEvent, panInfo: PanInfo) => {
    const width = window.innerWidth;
    const offSet = panInfo.offset;
    const x = offSet.x;

    const shouldUpdate = Math.abs(x) > width / 4;
    const isWindy = x > 0;

    if (shouldUpdate) {
      updateIsWindy(isWindy);
      setIsModalOpen(true);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          text={
            isWindyToggle
              ? "Le lezioni son state attivate"
              : "Le lezioni son state disattivate"
          }
          onClick={toggleModal}
        />
      )}
      <Slider type="LESSONS" onDragEnd={handleDragEnd} />
    </>
  );
};

export { Admin };
