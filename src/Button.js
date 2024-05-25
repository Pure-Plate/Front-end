import { useEffect, useState } from "react";
import trueStyles from "./AttributesButtonSelectedTrue/AttributesButtonSelectedTrue.module.css";
import falseStyles from "./AttributesButtonSelectedFalse/AttributesButtonSelectedFalse.module.css";
import styles from "./Pureplate/Pureplate.module.css";

function Button({ attribute, selected = false }) {
  const [toggleOn, setToggleOn] = useState(selected);
  const onClick = () => {
    setToggleOn(!toggleOn);
  };
  const className = `${
    toggleOn
      ? trueStyles.attributesButtonSelectedTrue
      : falseStyles.attributesButtonSelectedFalse
  } ${trueStyles.distance}`;

  return (
    <button className={className} onClick={onClick}>
      {attribute}
    </button>
  );
}

export default Button;
