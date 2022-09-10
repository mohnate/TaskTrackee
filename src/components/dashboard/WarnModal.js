import { AnimatePresence, motion } from "framer-motion";
import addTaskModalstyles from "../../styles/dashboard/AddTaskModal.module.scss";
import dashboardStyles from "../../styles/dashboard/dashboard.module.scss";

export default function WarnModal({ msg, setToggleModal, setWarn }) {
  const closeModal = (e, btnClose) => {
    if (e === null && btnClose) {
      setWarn(false);
      setToggleModal(false);
      return;
    }
    if (e.currentTarget == e.target) {
      setWarn(false);
      setToggleModal(false);
      return;
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
        <motion.div
          className={addTaskModalstyles.pos}
          onClick={closeModal}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <section
            className={addTaskModalstyles.content}
            style={{ backgroundColor: "#2c313f", width: "400px" }}
          >
            <h1 className={addTaskModalstyles.warnModalHeader}>{msg}</h1>

            <div className={addTaskModalstyles.btnGroup}>
              <button
                type="button"
                onClick={() => setWarn(false)}
                className={`${dashboardStyles.addTaskBtn} ${addTaskModalstyles.backTaskBtn}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => closeModal(null, true)}
                className={`${dashboardStyles.addTaskBtn} ${addTaskModalstyles.cancelTaskBtn}`}
              >
                Discard
              </button>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
      <div className={addTaskModalstyles.bgClose} onClick={closeModal}></div>
    </>
  );
}
