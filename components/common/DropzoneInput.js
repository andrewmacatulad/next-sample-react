import React from "react";
import Dropzone from "react-dropzone";

const DropzoneInput = function({ input, name }) {
  return (
    <div>
      <Dropzone
        name={name}
        onDrop={filesToUpload => input.onChange(filesToUpload)}
      >
        Import image to upload
      </Dropzone>
    </div>
  );
};

export default DropzoneInput;
