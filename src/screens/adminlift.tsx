import { useEffect, useState } from "react";
import { FramerDragEvent, Slider } from "../components/Slider";
import { firebase } from "./../realtimedb/firebase";
import { PanInfo } from "framer-motion";
import { useHistory } from "react-router-dom";
import { Modal } from "../components/Modal";

const AdminLift = () => {
  const history = useHistory();
  const [isLift, setIsLift] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");
    isWindyDb.onSnapshot((doc) => {
      const value = doc.data();
      value && setIsLift(value.lift);
    });
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    history.push("/");
  };

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
    setIsModalOpen(true);
  };
  return (
    <>
      {isModalOpen && (
        <Modal
          text={
            isLift
              ? "I Lift son stati attivati"
              : "I Lift son stati disattivati"
          }
          onClick={toggleModal}
        />
      )}
      <Slider type="Lift" onDragEnd={handleDragEnd} />
    </>
  );
};

export { AdminLift };
