import React, { useState } from "react";
import { UploadCloud2 } from "@styled-icons/remix-line";

import style from "./FileUploader.Style";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { admState, statsState } from "../../../model";

const SumUp = ({ className, reset }) => {
  const model = useRecoilValue(statsState);

  return (
    <div className={className}>
      {model && <div>{model.details.duration}</div>}
      <button onClick={() => reset(false)}>reset</button>
    </div>
  );
};

const FileUploader = ({ className }) => {
  const setModel = useSetRecoilState(admState);
  const [load, setLoad] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    await uploadFile(file);
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    const filename = encodeURIComponent(file.name);

    const formData = new FormData();
    formData.append(filename, file);
    const response = await fetch(`/api/upload-url`, {
      method: "POST",
      body: formData,
    });
    const { data } = await response.json();
    setModel(data);
    setLoad(true);
  };

  return !load ? (
    <div className={className} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className={"drop-zone"}>
        <UploadCloud2 size={48} />
        <input onChange={handleChange} type="file" accept="text/xml" />
      </div>
    </div>
  ) : (
    <SumUp reset={setLoad} />
  );
};

export default style(FileUploader);
