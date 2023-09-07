"use client";

import folder from "@/assets/svg/folder.svg";
import Image from "next/image";
import jpgIcon from "@/assets/image/image.png";
import excelIcon from "@/assets/image/excel.png";
import pdfIcon from "@/assets/image/pdf.png";
import pdf from "@/assets/svg/pdfBig.svg";
import excel from "@/assets/svg/excel.svg";
import friends from "@/assets/image/friends.png";
import { IoHeartOutline } from "react-icons/io5";
import { BsFillCloudArrowDownFill, BsHeartFill } from "react-icons/bs";
import { getFileType } from "@/utilis/FileType";
import { notification } from "antd";
import { RiPrinterFill } from "react-icons/ri";

export function Folder({ name, data, onClick }) {
  return (
    <div
      className="flex items-center gap-[16px] cursor-pointer rounded-md  border border-[#EFF0F0] pl-[12px] pr-[72px] py-[10px] "
      onDoubleClick={onClick}
    >
      <Image
        src={folder}
        alt="folder"
        objectFit="contain"
        width={35}
        height={35}
      />
      <div className="flex flex-col items-center  ">
        <span>
          <p className="text-sm text-[#2E3031] font-[500]">{name}</p>
          <p className="text-xs text-[#6F7376]">{data}mb</p>
        </span>
      </div>
    </div>
  );
}

export function File({
  name,
  placeholder,
  date,
  displayExtension,
  isFavourite,
  onClick,
  download,
}) {
  const fileType = getFileType(name);

  const Icons = {
    image: jpgIcon,
    pdf: pdfIcon,
    excel: excelIcon,
  };

  // Extract the filename without extension
  const Heading = displayExtension
    ? name
    : name.split(".").slice(0, -1).join(".");

  const handleDownload = (e, name) => {
    e.preventDefault();
    const link = document.createElement("a");
    link.href = download;
    link.download = name;
    link.click();
    console.log(name);

    notification.info({
      message: (
        <span className="text-sm font-[500]  text-[#2E3031] ml-4">{name}</span>
      ),
      description: (
        <div lassName="text-xs text-[#6F7376] ml-4 bg-[red]">
          <span className="ml-4">369kb</span>
          {" . "}
          <span>53% done</span>
        </div>
      ),
      icon: (
        <div className="mr-2">
          <Image
            src={folder}
            alt="folder"
            objectFit="contain"
            className="mr-4"
            width={35}
            height={35}
          />
        </div>
      ),
    });
  };

  return (
    <div
      className="pt-[18px] pb-[16px] flex flex-col  px-[12px]  gap-[12px]  rounded-md boxShadow relative cursor-pointer "
      onDoubleClick={onClick}
    >
      <div className=" rounded-md flex justify-center bg-[#F2F5F7] backdrop-blur-md  ">
        <span className="rounded-full favourite absolute right-2 top-2 cursor-pointer z-50">
          {isFavourite ? (
            <BsHeartFill className="m-[9px] text-white" size={17} />
          ) : (
            <IoHeartOutline size={17} className="m-[9px] text-white" />
          )}
        </span>
        {fileType === "image" ? (
          <div className="w-[264px] h-[215px] relative flex-shrink-0">
            <Image
              src={placeholder}
              alt="image"
              layout="fill"
              quality={100}
              priority
              className="rounded"
            />
          </div>
        ) : fileType === "pdf" ? (
          <a
            href={download}
            target="_blank"
            className="py-[67.5px] px-[92px] relative"
            download={name}
            onDoubleClick={(e) => {
              handleDownload(e, name);
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Image
              src={pdf}
              width={80}
              height={80}
              alt="image"
              objectFit="contain"
            />
            <div className="absolute z-50 flex items-center gap-4 bottom-[10px] left-[8px] ">
              <span className="  rounded-full border border-[#EAEBEB]">
                <BsFillCloudArrowDownFill
                  className="m-[7px] text-[#6E7377]"
                  size={16}
                />
              </span>
              <span className="rounded-full border border-[#EAEBEB]">
                <RiPrinterFill className="m-[7px] text-[#6E7377]" size={16} />
              </span>
            </div>
          </a>
        ) : (
          <a
            href={download}
            className="py-[67.5px] px-[92px] relative "
            download={name}
            onDoubleClick={(e) => {
              handleDownload(e, name);
            }}
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <Image
              src={excel}
              width={80}
              height={80}
              alt="image"
              objectFit="contain"
            />
            <div className="absolute z-50 flex items-center gap-4 bottom-[10px] left-[8px] ">
              <span className="  rounded-full border border-[#EAEBEB]">
                <BsFillCloudArrowDownFill
                  className="m-[7px] text-[#6E7377]"
                  size={16}
                />
              </span>
              <span className="rounded-full border border-[#EAEBEB]">
                <RiPrinterFill className="m-[7px] text-[#6E7377]" size={16} />
              </span>
            </div>
          </a>
        )}
      </div>

      <div className="flex items-center gap-[16px]">
        <Image
          src={Icons[fileType]}
          alt="icon"
          width={35}
          height={35}
          objectFit="contain"
        />
        <span>
          <p className="text-sm font-[500] text-[#2E3031]">{Heading}</p>
          <p className="text-xs text-[#6F7376]">Added {date}</p>
        </span>
      </div>
    </div>
  );
}
