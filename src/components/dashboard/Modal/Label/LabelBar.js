import styles from "$Styles/dashboard/modal.module.scss";

import PropTypes from "prop-types";

LabelBar.propTypes = {
  data: PropTypes.object.isRequired,
  setLabelTitle: PropTypes.func.isRequired,
};

export default function LabelBar({ data, setLabelTitle }) {
  const editLabel = () => {
    setLabelTitle({
      title: data.label,
      state: "edit", // state of current label, there are "edit" and "add" two state available
      oriTitle: data.label, // retain the original title of the label while the label is being edited and unsaved.
      id: data.id, // id of label as provided by Supabase upon creation
      colour: data.colour,
      oriColour: data.colour, // retain the original colour of the label while the label is being edited and unsaved.
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
          // if the colour of the label as selected by the user is too dark
          // white colour label text will be shown instead of black colour
          // to provided better contrast to the word
          parseInt(data.colour.slice(1, 3), 16) <= 130 ? { color: "#fff" } : {}
        }
      >
        {data.label}
      </span>
    </span>
  );
}
