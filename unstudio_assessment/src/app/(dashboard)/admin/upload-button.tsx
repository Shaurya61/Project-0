"use client"
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const UploadButton = () => {
  return (
    <div className="mb-6">
      <CldUploadWidget uploadPreset="next_cloudinary_app">
        {({ open }: { open: () => void }) => {
          return <Button className="" onClick={() => open()}>Upload an Image</Button>;
        }}
      </CldUploadWidget>
    </div>
  );
};

export default UploadButton;
