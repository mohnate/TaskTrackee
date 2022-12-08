import styles from "$Styles/dashboard/modal.module.scss";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";

import LabelForm from "./LabelForm";
import WarnModal from "../WarnModal";
import LabelBar from "./LabelBar";

export default function LabelModal({ setToggleLabelModal, toggleLabelModal }) {
  const labelData = useSelector((state) => state.labelData.value);
  const [warn, setWarn] = useState();
  const newLabel = {
    title: "new label",
    state: "add", // state of current label, there are "edit" and "add" two state available
    colour: "#336b2c",
  };
  const [labelTitle, setLabelTitle] = useState(newLabel);

  const closeModal = (e, btnClose) => {
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
      if (labelTitle?.oriColour) {
        if (labelTitle.oriColour !== labelTitle.colour) return true;
      } else if (labelTitle.colour !== "#336b2c") return true;
      return false;
    };

    // user close modal through cancel btn (e === null)
    // or close modal throguh clicking/touching background (e !== null)
    if ((e === null && btnClose) || e.currentTarget == e.target) {
      if (titleDidChange() || colourDidChange()) {
        return setWarn("You have unsaved changes");
      } else {
        setLabelTitle(newLabel);
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
                  labelTitle={labelTitle}
                  setLabelTitle={setLabelTitle}
                  newLabel={newLabel}
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
