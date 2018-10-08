import React from "react";

const CheckInput = ({ input, type, label }) => {
  return (
    <div className="ui checkbox">
      <input {...input} type={type} />
      <label>{label}</label>
    </div>
  );
};
export default CheckInput;
