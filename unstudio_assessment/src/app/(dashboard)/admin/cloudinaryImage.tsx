"use client";
import { CldImage } from "next-cloudinary";
import React from "react";

const CloudinaryImage = (props: any) => {
  return (
    <div>
      <CldImage {...props} />
    </div>
  );
};

export default CloudinaryImage;
