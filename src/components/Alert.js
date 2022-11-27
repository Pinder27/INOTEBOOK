import React from "react";

const Alert = (props) => {
//   const capitalize = (word) => {
//     if (word === "danger") word = "Error";
//     const lower = word.toLowerCase();
//     const string = (lower.charAt(0).toUpperCase + lower.slice(1));
//      return  string
//   };
  return (
    <div style={{height:"40px"}}>
      {props.alert && (
        <div style={{height:"40px"}}
          className={`alert alert-${props.alert.type} alert-dismissible fade show mb-0 py-1`}
          role={props.alert}
        >
          <strong>{props.alert.type}</strong> : {props.alert.message}
        </div>
      )}
    </div>
  );
};

export default Alert;
