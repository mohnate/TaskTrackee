import styles from "$Styles/dashboard/modal.module.scss";
import inputStyles from "$Styles/input.module.scss";
import dashboardStyles from "$Styles/dashboard/dashboard.module.scss";

import { useState } from "react";
import { supabase } from "$Lib/supabase";

const LabelForm = ({ closeModal, labelTitle, setLabelTitle, newLabel }) => {
  // Show Status about label after certain supabase action.
  // State will be updated based on label insert, update and delete.
  const [showInfo, setShowInfo] = useState({
    msg: null,
    status: false,
    style: {},
  });

  // Supabase Insert and Update Label Function
  const sumbitHandler = async (e) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const label = { ...labelTitle };

    // Supabase Insert Label
    if (labelTitle.state === "add") {
      const { error } = await supabase.from("Labels").insert([
        {
          user_uid: user.id,
          label: labelTitle.title,
          colour: labelTitle.colour,
        },
      ]);
      if (error) console.error(error);

      setShowInfo({
        msg: `${label.title} added`,
        status: true,
        style: { backgroundColor: "#16c928" },
      });
      setTimeout(() => setShowInfo({ tatus: false }), 5000);

      setLabelTitle(newLabel);
    }

    // Supabase Update Label
    if (labelTitle.state === "edit") {
      const { error } = await supabase
        .from("Labels")
        .update([
          {
            label: labelTitle.title,
            colour: labelTitle.colour,
          },
        ])
        .eq("user_uid", user.id)
        .eq("id", labelTitle.id);
      if (error) console.error(error);

      setShowInfo({
        msg: `${label.title} updated`,
        status: true,
        style: { backgroundColor: "#16c9a2" },
      });
      setTimeout(() => setShowInfo({ status: false }), 5000);
    }
  };

  // Supabase Delete Label Function
  const deleteHandler = async () => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { user } = session;
    const { error } = await supabase
      .from("Labels")
      .delete()
      .eq("user_uid", user.id)
      .eq("id", labelTitle.id);
    if (error) console.error(error);

    const label = { ...labelTitle };
    setShowInfo({
      msg: `${label.title} deleted`,
      status: true,
      style: { backgroundColor: "#ad1111" },
    });
    setTimeout(() => setShowInfo({ status: false }), 5000);

    setLabelTitle(newLabel);
  };

  // reset label title and colour input to default
  const resetInput = () => {
    setLabelTitle(newLabel);
  };

  // Component return output
  return (
    <form className={styles.labelForm} onSubmit={sumbitHandler}>
      <div className={styles.labelFormDiv}>
        <h2 className={styles.labelFormHeader}>
          <span
            style={{ display: "flex", alignItems: "center", height: "27px" }}
          >
            Editing <span className={styles.boldHyp}>-</span>
            {labelTitle.state === "edit"
              ? labelTitle.oriTitle
              : labelTitle.title}
          </span>
          {labelTitle.state === "edit" ? (
            // Delete Button
            <button
              type="button"
              onClick={deleteHandler}
              className={`${dashboardStyles.addTaskBtn} ${styles.deleteBtn}`}
            >
              Delete
            </button>
          ) : null}
        </h2>

        <label className={inputStyles.inputLabel} htmlFor="labelName">
          Title
        </label>
        <div className={styles.inputFlex}>
          <input
            className={inputStyles.labelInput}
            type="text"
            id="labelName"
            onChange={(e) =>
              setLabelTitle((prev) => {
                let result;
                if (prev?.oriTitle) {
                  result = {
                    title: e.target.value,
                    state: prev.state,
                    oriTitle: prev.oriTitle,
                    id: prev.id,
                    colour: prev.colour,
                  };
                } else {
                  result = {
                    title: e.target.value,
                    state: prev.state,
                    colour: prev.colour,
                  };
                }
                return result;
              })
            }
            value={labelTitle.title}
          />
          <input
            className={inputStyles.colourInput}
            type="color"
            id="labelColour"
            onChange={(e) =>
              setLabelTitle((prev) => {
                let result;
                if (prev?.oriColour) {
                  result = {
                    title: prev.title,
                    state: prev.state,
                    oriTitle: prev.oriTitle,
                    id: prev.id,
                    colour: e.target.value,
                    oriColour: prev.oriColour,
                  };
                } else {
                  result = {
                    title: prev.title,
                    state: prev.state,
                    colour: e.target.value,
                  };
                }
                return result;
              })
            }
            value={labelTitle.colour}
          />
        </div>

        {showInfo.status ? (
          <div className={styles.infoLabelPop} style={showInfo.style}>
            <p className={styles.infoLabelMsg}>{showInfo.msg}</p>
          </div>
        ) : null}
      </div>

      {/* Button Section */}
      <div className={styles.btnGroup}>
        {/* Cancel Button  */}
        <button
          type="button"
          onClick={() => closeModal(null, true)}
          className={`${dashboardStyles.addTaskBtn} ${styles.cancelTaskBtn}`}
        >
          Cancel
        </button>
        {/* Reset Button  */}
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
          {labelTitle.state === "add" ? "Add Label" : "Save"}
        </button>
      </div>
    </form>
  );
};

LabelForm.displayName = "LabelForm";
export default LabelForm;
