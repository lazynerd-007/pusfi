import React, { useState } from 'react';
import { Upload, Button, message, Progress } from 'antd';
import Papa from 'papaparse';
import UploadImage from "@/assets/icon/uploadImage";
import { CustomDragger as Dragger } from "@/lib/AntdComponents";
import type { UploadProps } from 'antd/es/upload/interface';

interface Props {
  next: () => void;
  setCsvData: (data: string) => void;
}

const Step1: React.FC<Props> = ({ next, setCsvData }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateProgress = () => {
    let simulatedProgress = 0;
    const interval = setInterval(() => {
      simulatedProgress += 30;
      setProgress(simulatedProgress);
      if (simulatedProgress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== 'text/csv') {
      message.error(`${file.name} is not a csv file`);
      return false;
    }

    setUploading(true);
    simulateProgress();

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setTimeout(() => {
        setCsvData(text);
        message.success(`${file.name} file uploaded successfully`);
        setUploading(false);
        setProgress(100); // Complete the progress bar
        next();
      }, 1000); // Simulate a delay of 1 second
    };
    reader.readAsText(file);

    return false; // Prevent default upload behavior
  };

  const onUploadChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'error') {
      setUploading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <section className="bg-white mt-5">
      <div className=" md:flex  justify-between p-5 items-center">
        <div className="text-left max-w-[300px]">
          <h2 className="font-medium text-2xl">Upload Batch Payment</h2>
          <p className="text-[#515B6F] text-base">
            Upload the payment file, including the amount, bank source code, bank name, account name, bank name.
          </p>
        </div>
        <div className=' flex flex-col w-full mt-5 md:mt-0 md:w-[60%]'>
        <Dragger
          className="w-full h-[150px]"
          beforeUpload={handleFileUpload}
          onChange={onUploadChange}
          showUploadList={false}
          accept=".csv"
        >
          <div className="flex flex-col justify-center items-center">
            <UploadImage />
            <h4 className="font-medium text-base">
              Click to replace <span className="text-[#515B6F] font-normal"> or drag and drop</span>
            </h4>
            <p className="text-[#C1C5D0] font-normal text-base">CSV File or Excel File</p>
          </div>
        </Dragger>

        {uploading && (
          <Progress
            percent={progress}
            strokeColor="#0F75BC" // Custom color
            style={{ marginTop: 10, width: '100%' }}
          />
        )}
        </div>
      </div>
    </section>
  );
};

export default Step1;
