import styles from "./Pureplate/Pureplate.module.css";
// import { AttributesButtonSelectedTrue } from "./AttributesButtonSelectedTrue/AttributesButtonSelectedTrue.jsx";
// import { AttributesButtonSelectedFalse } from "./AttributesButtonSelectedFalse/AttributesButtonSelectedFalse.jsx";
import Button from "./Button.js";

const attributes = ["Vegan", "Halal", "Gluten-Free", "Lacto-Free"];

function Attributes() {
  return (
    <div className={styles.attributes}>
      {/* <img className={styles.filterIcon} src="filter-icon0.svg" /> */}
      <Button attribute={attributes[0]} selected={true} />
      <Button attribute={attributes[1]} selected={false} />
      <Button attribute={attributes[2]} selected={false} />
      <Button attribute={attributes[3]} selected={false} />
    </div>
  );
}

export default Attributes;
