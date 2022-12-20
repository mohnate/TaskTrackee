import styles from "$Styles/dashboard/modal.module.scss";
import CheckSvg from "../../../icons/CheckSvg";

import { useContext, useEffect, useState } from "react";
import { LabelContext } from "../Task/TaskModal";

import PropTypes from "prop-types";

LabelBarSelect.propTypes = {
  data: PropTypes.object.isRequired,
  taskId: PropTypes.number.isRequired,
};

export default function LabelBarSelect({ data, taskId }) {
  // to show tick in label onHover and set label
  // as selected onClick
  const [toggleCheck, setToggleCheck] = useState({
    selected: false,
    hover: false,
  });
  // useContext from TaskModal.js
  const { state, dispatch } = useContext(LabelContext);

  // set label-check for the selected id at the first render
  useEffect(() => {
    setSelectedLabel();
  }, []);

  // set label-check for the selected id at the first render,
  // different is that this is for exisiting
  useEffect(() => {
    if (taskId && !toggleCheck.selected) setSelectedLabel();
  }, [state]);

  const setSelectedLabel = () => {
    state.forEach((labelId) => {
      if (labelId === data.id) {
        setToggleCheck((prev) => {
          const statement = { selected: !prev.selected, hover: prev.hover };
          return statement;
        });
      }
    });
  };

  const handleMouseOver = (condition) => {
    if (condition) {
      setToggleCheck((prev) => {
        const statement = { selected: prev.selected, hover: true };
        return statement;
      });
    } else {
      setToggleCheck((prev) => {
        const statement = { selected: prev.selected, hover: false };
        return statement;
      });
    }
  };

  return (
    <span
      className={styles.labelBar}
      style={{ backgroundColor: `${data.colour}` }}
    >
      <span
        style={
          parseInt(data.colour.slice(1, 3), 16) <= 130 ? { color: "#fff" } : {}
        }
        className={styles.labelText}
      >
        {data.label}
      </span>
      <div
        className={styles.labelBarTickBox}
        onMouseEnter={() => handleMouseOver(true)}
        onMouseLeave={() => handleMouseOver(false)}
        onClick={() => {
          setToggleCheck((prev) => {
            const statement = { selected: !prev.selected, hover: prev.hover };
            return statement;
          });
          dispatch({ selected: !toggleCheck.selected, id: data.id });
        }}
      >
        {
          // show check if toggleCheck is selected
          toggleCheck.selected ? (
            <CheckSvg color={"#10952d"} />
          ) : // if toggleCheck is NOT selected, check if toggleCheck is hover
            toggleCheck.hover ? (
            // if toggleCheck is NOT on hover, nothing is shown :)
              <CheckSvg />
            ) : null
        }
      </div>
    </span>
  );
}
