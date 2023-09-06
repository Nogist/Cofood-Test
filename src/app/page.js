"use client";
import React, { useState, useEffect, useTransition } from "react";
import { Folder, File } from "@/components/Folder";
import axiosInstance from "@/utilis/request";
import { Input, Select, Spin, notification } from "antd";
import { useMutation, useQuery } from "react-query";
import { IoFilterOutline } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import dayjs from "dayjs";
import { getFileType } from "@/utilis/FileType";
import Preview from "@/components/Preview";
import { ImHome3 } from "react-icons/im";
import { AiOutlineRight } from "react-icons/ai";

async function fetchFolders() {
  const res = await axiosInstance.get("");
  return res.data;
}

const Page = () => {
  const [foldersData, setFoldersData] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [breadcrumb, setBreadcrumb] = useState([{ name: "Home", id: null }]);

  const [_, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [preview, setPreview] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const {
    isLoading,
    data: initialData,
    refetch,
  } = useQuery(
    "/getFolders",
    () => fetchFolders(),
    {
      onSuccess: (data) => {
        const folderItems = data.filter((item) => item.type === "folder");
        const fileItems = data.filter((item) => item.type !== "folder");
        setFoldersData(folderItems);
        setFilesData(fileItems);
      },
    },
    {
      onError: (data) => {
        notification.error({
          message: " SOmething is wrong",
          description: error?.response?.data?.message,
        });
      },
    }
  );

  const { isLoading: folderLoading, mutate } = useMutation(
    async (id) => {
      try {
        const res = await axiosInstance.get(`/file/${id}`);
        return res.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: (data) => {
        const folderItems = data.filter((item) => item.type === "folder");
        const fileItems = data.filter((item) => item.type !== "folder");
        setFoldersData(folderItems);
        setFilesData(fileItems);
      },

      onError: (error) => {
        notification.error({
          message: "Something went wrong",
          description: error?.response?.data?.message,
        });
      },
    }
  );

  const sortingItems = (value) => {
    if (value === "2") {
      setSortOrder("asc");
    } else if (value === "3") {
      setSortOrder("date");
    } else {
      setSortOrder("");
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    startTransition(() => {
      setSearch(e.target.value);
      setTimeout(() => refetch(), 100);
    });
  };

  const handleFileClick = (file) => {
    const fileType = getFileType(file.name);
    if (fileType === "image") {
      setSelectedItem(file);
      setPreview(true);
    }
  };

  const handleFolderClick = (folder) => () => {
    mutate(folder.id);
    const newBreadcrumbItem = { name: folder.name, id: folder.id };
    setBreadcrumb([...breadcrumb, newBreadcrumbItem]);
  };

  const handleBreadcrumbItemClick = (index) => {
    const clickedBreadcrumb = breadcrumb[index];

    if (clickedBreadcrumb.id === null) {
      // When "Home" breadcrumb is clicked, reset to initial state
      setFoldersData(initialData.filter((item) => item.type === "folder"));
      setFilesData(initialData.filter((item) => item.type !== "folder"));

      const updatedBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(updatedBreadcrumb);
    } else {
      const folderId = clickedBreadcrumb.id;
      mutate(folderId);

      const updatedBreadcrumb = breadcrumb.slice(0, index + 1);
      setBreadcrumb(updatedBreadcrumb);
    }
  };

  return (
    <div className="w-full flex flex-col mt-[110px] px-[100px] justify-center ">
      <div className="flex items-center mb-[20px]">
        {breadcrumb.map((item, index) => (
          <span
            key={item.id}
            className={`flex items-center mr-2 ${
              index === breadcrumb.length - 1
                ? "text-[#2E3031] font-bold"
                : "text-[#7A8085]"
            }`}
          >
            {index !== 0 && <AiOutlineRight />}
            <span
              className={`cursor-pointer gap-2 ml-2 hover:bg-[#F2F5F7] hover:rounded p-2  ${
                index === breadcrumb.length - 1
                  ? "text-[#2E3031] font-bold"
                  : ""
              }`}
              onClick={() => handleBreadcrumbItemClick(index)}
            >
              {index === 0 ? <ImHome3 /> : item.name}
            </span>
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mb-[40px]">
        <Select
          defaultValue="1"
          style={{ width: 114 }}
          suffixIcon={
            <IoFilterOutline color="#96999C" className="custom-select-arrow" />
          }
          onChange={(value) => sortingItems(value)}
          options={[
            { value: "1", label: "Sort" },
            { value: "2", label: "By name" },
            { value: "3", label: "By time created" },
          ]}
          className="font-avenir"
        />

        <Input
          style={{ width: "255px" }}
          placeholder="Search"
          prefix={<LuSearch color="#B5B8BA" className="mr-2" />}
          onChange={(e) => handleSearch(e)}
        />
      </div>
      <div className="">
        <div className="flex flex-col gap-[24px] ">
          <h2 className="text-[20px] font-semibold text-[#2E3031]">Folders</h2>
          {isLoading || folderLoading ? (
            <div>
              <Spin></Spin>
            </div>
          ) : (
            <div className=" flex items-center gap-[24px] ">
              {foldersData?.map((item) => (
                <Folder
                  key={item.id}
                  name={item?.name}
                  data={10}
                  onClick={handleFolderClick(item)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-[24px] my-[40px]">
          <h2 className="text-[20px] font-semibold text-[#2E3031]">Files</h2>
          {isLoading || folderLoading ? (
            <div>
              <Spin></Spin>
            </div>
          ) : (
            <div className=" flex w-full items-center gap-[24px] justify-start flex-wrap">
              {filesData
                ?.filter((fil) => {
                  const name = fil.name;
                  return name.toLowerCase().includes(search.toLowerCase());
                })
                .sort((a, b) => {
                  if (sortOrder === "asc") {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
                    return nameA.localeCompare(nameB);
                  } else if (sortOrder === "date") {
                    const dateA = new Date(a.created_at);
                    const dateB = new Date(b.created_at);
                    return dateA - dateB;
                  } else {
                    return 0;
                  }
                })
                .map((item) => (
                  <File
                    key={item.id}
                    placeholder={item?.src}
                    name={item?.name}
                    date={dayjs(item?.created_at).format("DD, MMMM, YYYY")}
                    isFavourite={item.favourite}
                    displayExtension={false}
                    download={item?.src}
                    onClick={() => handleFileClick(item)}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
      {preview && (
        <Preview
          modalOpen={preview}
          modalClose={() => setPreview(false)}
          displayExtension={false}
          name={selectedItem?.name}
          placeholder={selectedItem?.src}
          date={dayjs(selectedItem?.created_at).format("DD, MMMM, YYYY")}
          isFavourite={selectedItem?.favourite}
        />
      )}
    </div>
  );
};

export default Page;
