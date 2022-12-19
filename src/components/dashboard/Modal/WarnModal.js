import { AnimatePresence, motion } from "framer-motion";
import modalStyles from "$Styles/dashboard/modal.module.scss";
import dashboardStyles from "$Styles/dashboard/dashboard.module.scss";

export default function WarnModal({ msg, setToggleModal, setWarn, reset }) {
  const closeModal = (e, btnClose) => {
    // user close modal through cancel btn (e === null)
    // or close modal throguh clicking/touching background (e !== null)
    if (e === null && btnClose) {
      setWarn(false);
      setToggleModal(false);
      if (reset) reset();
      return;
    }
    if (e.currentTarget == e.target) {
      setWarn(false);
      if (reset) reset();
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
          className={modalStyles.pos}
          onClick={closeModal}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <section className={modalStyles.contentWarn}>
            <h1 className={modalStyles.warnModalHeader}>{msg}</h1>

            <div className={modalStyles.btnGroup}>
              <button
                type="button"
                onClick={() => setWarn(false)}
                className={`${dashboardStyles.addTaskBtn} ${modalStyles.backTaskBtn}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => closeModal(null, true)}
                className={`${dashboardStyles.addTaskBtn} ${modalStyles.cancelTaskBtn}`}
              >
                Discard
              </button>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>
      <div className={modalStyles.bgClose} onClick={closeModal}></div>
    </>
  );
}
