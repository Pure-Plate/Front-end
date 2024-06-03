import halalIcon from "../assets/Icons/flag_halal.svg";
import veganIcon from "../assets/Icons/flag_vegan.svg";
import glutenIcon from "../assets/Icons/flag_glutenfree.svg";
import lactoIcon from "../assets/Icons/flag_loctosfree.svg";

import halalIcon1 from "../assets/Icons/flag_halal1.svg";
import veganIcon1 from "../assets/Icons/flag_vegan1.svg";
import glutenIcon1 from "../assets/Icons/flag_glutenfree1.svg";
import lactoIcon1 from "../assets/Icons/flag_loctosfree1.svg";

export const cssList = {
  Vegan: "rgba(118, 199, 183, 0.85)",
  Halal: "rgba(118, 199, 131, 0.85)",
  "Gluten-Free": "rgba(233, 250, 234, 0.9)",
  "Lacto-Free": "rgba(254, 246, 176, 0.85)",
};

export const icons = {
  Vegan: { default: veganIcon1, active: veganIcon },
  Halal: { default: halalIcon1, active: halalIcon },
  "Gluten-Free": { default: glutenIcon1, active: glutenIcon },
  "Lacto-Free": { default: lactoIcon1, active: lactoIcon },
};
