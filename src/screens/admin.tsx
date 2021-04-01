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
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    history.push("/adminlift");
  };
  const updateIsWindy = (newValue: boolean) => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");

    isWindyDb.update({ isWindy: newValue });
  };
  const handleDragEnd = (_evt: FramerDragEvent, panInfo: PanInfo) => {
    const width = window.innerWidth;
    const offSet = panInfo.offset;
    const x = offSet.x;

    const shouldUpdate = Math.abs(x) > width / 4;
    const isWindy = x > 0;

    shouldUpdate && updateIsWindy(isWindy);
    setIsModalOpen(true);
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
      <Slider type="Lesson" onDragEnd={handleDragEnd} />
    </>
  );
};

export { Admin };
