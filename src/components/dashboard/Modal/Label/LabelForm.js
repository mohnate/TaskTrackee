import styles from "$Styles/dashboard/modal.module.scss";
import inputStyles from "$Styles/input.module.scss";
import dashboardStyles from "$Styles/dashboard/dashboard.module.scss";

import React, { useImperativeHandle, useRef } from "react";
import { supabase } from "$Lib/supabase";

const LabelForm = React.forwardRef(({ closeModal }, ref) => {
  const titleRef = useRef(null);
  const colourRef = useRef(null);

  useImperativeHandle(ref, () => {
    return {
      titleInput: () => titleRef.current.value,
      colourInput: () => colourRef.current.value,
    };
  });

  const sumbitHandler = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const colour = colourRef.current.value;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const { error } = await supabase.from("Labels").insert([
      {
        user_uid: user.id,
        label: title,
        colour,
      },
    ]);
    if (error) console.error(error);

    titleRef.current.value = "new label";
    colourRef.current.value = "#336b2c";
  };

  const resetInput = () => {
    titleRef.current.value = "new label";
    colourRef.current.value = "#336b2c";
  };

  return (
    <form className={styles.labelForm} onSubmit={sumbitHandler}>
      <div className={styles.labelFormDiv}>
        <label className={inputStyles.inputLabel} htmlFor="labelName">
          Title
        </label>
        <div className={styles.inputFlex}>
          <input
            className={inputStyles.labelInput}
            defaultValue="new label"
            type="text"
            id="labelName"
            ref={titleRef}
          />
          <input
            className={inputStyles.colourInput}
            type="color"
            defaultValue="#336b2c"
            id="labelColour"
            ref={colourRef}
          />
        </div>
      </div>
      <div className={styles.btnGroup}>
        <button
          type="button"
          onClick={() => closeModal(null, true)}
          className={`${dashboardStyles.addTaskBtn} ${styles.cancelTaskBtn}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={resetInput}
          className={`${dashboardStyles.addTaskBtn} ${styles.backTaskBtn}`}
        >
          Reset
        </button>
        {/* Submit Button  */}
        <button
          type="submit"
          className={`${dashboardStyles.addTaskBtn} ${styles.addTaskBtn}`}
        >
          Add Label
        </button>
      </div>
    </form>
  );
});

export default LabelForm;
