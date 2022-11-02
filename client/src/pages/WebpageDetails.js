import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, message } from "antd";
import "antd/dist/antd.min.css";
import "./webpage.css";
import { useSelector } from "react-redux";

function WebpageDetails() {
  const { url } = useSelector((state) => state.Urls);

  console.log("url:", url);
  const [data1, setData1] = useState("");
  const getDetails = async () => {
    try {
      const response = await axios.post("/api/user/getDetails", {
        _id: url._id,
      });
      message.success(response.data.message);
      console.log("response", response.data.data);
      setData1(response.data.data);
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };
  const updatedPage = async (record, action) => {
    let payload = null;
    if (action === "remove") {
      payload = {
        ...record,
        isFavourite: false,
      };
    } else if (action === "add") {
      payload = {
        ...record,
        isFavourite: true,
      };
    }

    try {
      const response = await axios.post("/api/user/update", payload);

      if (response.data.success) {
        message.success(response.data.message);
        getDetails();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const Remove = async (id) => {
    try {
      const response = await axios.post("/api/user/delete", { _id: id });
      if (response.data.success) {
        message.success(response.data.message);
        getDetails();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const columns = [
    {
      title: "Domain Name",
      dataIndex: "domainName",
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Word Count",
      dataIndex: "wordCount",
    },
    {
      title: "Web Link",
      dataIndex: "weblink",
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Media Link",
      dataIndex: "mediaLink",
      render: (text) => (
        <a href={text} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: "Favourite",
      dataIndex: "",
      render: (_, record) => {
        return record?.isFavourite ? "True" : "False";
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div>
          {record?.isFavourite && (
            <p onClick={() => updatedPage(record, "remove")}>
              Remove From Favourite
            </p>
          )}
          {!record?.isFavourite && (
            <p onClick={() => updatedPage(record, "add")}>Add To Favourite</p>
          )}
          {<p onClick={() => Remove(record._id)}>Remove</p>}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <div>
      {url && <Table columns={columns} dataSource={data1}/>}
    </div>
  );
}

export default WebpageDetails;
