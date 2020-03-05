import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import classes from "./../Button/Button.module.scss";
import { BUTTON_TYPE, getButtonClasses } from "./../Button/Button";

interface AnchorProps {
  href: string,
  label: string,
  type: BUTTON_TYPE,
  ariaLabel: string,
  style?: CSSProperties
}

const anchor = ({ href, label, type, ariaLabel, style }: AnchorProps) => {
  let buttonClasses = getButtonClasses(type);

  /* switch (type) {
    case "TEXT":
      buttonClasses += " " + classes["Button--Text"];
      break;
    case "OUTLINED":
      buttonClasses += " " + classes["Button--Outlined"];
      break;
    case "CONTAINED":
      buttonClasses += " " + classes["Button--Contained"];
      break;

    default:
      console.error("Bad anchor type " + type);
      buttonClasses += " " + classes["Button--Text"];
      break;
  } */

  return (
    <Link 
      to={href} 
      className={buttonClasses} 
      style={style}
      aria-label={ariaLabel}
    >
      <span className={classes.Label}>{label}</span>
    </Link>
  );
};

export default anchor;
