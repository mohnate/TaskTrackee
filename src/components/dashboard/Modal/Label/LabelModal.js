import styles from "$Styles/dashboard/modal.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

import LabelForm from "./LabelForm";
import WarnModal from "../WarnModal";

export default function LabelModal({ setToggleLabelModal, toggleLabelModal }) {
  const labelData = useSelector((state) => state.labelData.value);
  const [warn, setWarn] = useState();
  const [labelTitle, setLabelTitle] = useState({
    title: "new label",
    state: "add",
  });
  const labelFormRef = useRef();

  const closeModal = (e, btnClose) => {
    const colour = labelFormRef.current.colourInput();

    const titleDidChange = () => {
      if (labelTitle.state === "add") {
        if (labelTitle.title !== "new label") return true;
        return false;
      }

      if (labelTitle.state === "edit") {
        if (labelTitle.title !== labelTitle.oriTitle) return true;
        return false;
      }
    };

    const colourDidChange = () => {
      if (colour !== "#336b2c") return true;
      return false;
    };

    if (e === null && btnClose) {
      if (titleDidChange() || colourDidChange()) {
        return setWarn("You have unsaved changes");
      } else {
        setLabelTitle({
          title: "new label",
          state: "add",
        });
        return setToggleLabelModal(false);
      }
    }
    if (e.currentTarget == e.target) {
      if (titleDidChange() || colourDidChange()) {
        return setWarn("You have unsaved changes");
      } else {
        setLabelTitle({
          title: "new label",
          state: "add",
        });
        return setToggleLabelModal(false);
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {toggleLabelModal && (
          <motion.div
            className={styles.pos}
            onClick={closeModal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <main className={styles.content}>
              <h1 className={styles.head}>Labels</h1>
              <div className={styles.labelMainWhite}>
                {labelData?.length > 0 ? (
                  labelData.map((label) => (
                    <LabelBar
                      data={label}
                      key={label.id}
                      setLabelTitle={setLabelTitle}
                    />
                  ))
                ) : (
                  <>
                    <span className={styles.missingLabel}>
                      You don't have any label created currently
                    </span>
                  </>
                )}
              </div>
              <div className={styles.labelMain}>
                <LabelForm
                  closeModal={closeModal}
                  ref={labelFormRef}
                  labelTitle={labelTitle}
                  setLabelTitle={setLabelTitle}
                />
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {toggleLabelModal ? (
        <div className={styles.bgClose} onClick={closeModal}></div>
      ) : null}

      {warn ? (
        <WarnModal
          msg={warn}
          setToggleModal={setToggleLabelModal}
          setWarn={setWarn}
        />
      ) : null}
    </>
  );
}

export function LabelBar({ data, setLabelTitle }) {
  const editLabel = () => {
    setLabelTitle({
      title: data.label,
      state: "edit",
      oriTitle: data.label,
      id: data.id,
    });
  };

  return (
    <span
      className={styles.labelBar}
      style={{ backgroundColor: `${data.colour}` }}
      onClick={editLabel}
    >
      <span
        style={
          parseInt(data.colour.slice(1, 3), 16) <= 130 ? { color: "#fff" } : {}
        }
      >
        {data.label}
      </span>
    </span>
  );
}
