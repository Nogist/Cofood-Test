import React from "react";
import Image from "next/image";
import jpgIcon from "@/assets/image/image.png";
import Modal from "antd/es/modal/Modal";
import { IoMdClose } from "react-icons/io";
import { BsFillCloudArrowDownFill, BsHeartFill } from "react-icons/bs";
import { getFileType } from "@/utilis/FileType";
import { IoHeartOutline } from "react-icons/io5";

const Preview = ({
  modalOpen,
  modalClose,
  name,
  date,
  displayExtension,
  placeholder,
  isFavourite,
}) => {
  const Heading = displayExtension
    ? name
    : name.split(".").slice(0, -1).join(".");

  return (
    <div>
      <Modal
        style={{ background: "white", borderRadius: "8px" }}
        width={691}
        wrapClassName="backdrop-blur-md bg-opacity-50"
        centered
        open={modalOpen}
        onOk={modalClose}
        onCancel={modalClose}
        footer={null}
        closeIcon={
          <span className="flex items-center py-[4px] px-[8px] mr-[50px] bg-[#DFE1E2] rounded">
            <IoMdClose color="#53575A" size={16} />
            <p className="text-[#53575A] text-sm">Close</p>
          </span>
        }
      >
        <div className="relative">
          <span
            className="absolute -top-[45px] left-0 rounded-full border border-[#EAEBEB]"
            onClick={modalClose}
          >
            <BsFillCloudArrowDownFill
              className="m-[7px] text-[#6E7377]"
              size={16}
            />
          </span>
          <div className="pt-[30px] border-t border-[#EAEBEB] mt-[40px]">
            <div className="w-full h-[392px] relative flex-shrink-0">
              <span className="rounded-full favourite absolute right-2 top-2 cursor-pointer z-50">
                {isFavourite ? (
                  <BsHeartFill className="m-[9px] text-white" size={17} />
                ) : (
                  <IoHeartOutline size={17} className="m-[9px] text-white" />
                )}
              </span>
              <Image
                src={placeholder}
                alt="image"
                layout="fill"
                quality={100}
                priority
                className="rounded"
              />
            </div>
          </div>
          <div className="flex items-center gap-[16px] mt-[16px]">
            <Image
              src={jpgIcon}
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
      </Modal>
    </div>
  );
};

export default Preview;
