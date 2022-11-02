import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setUrl } from "../redux/urlSlice";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const [data, setData] = useState(null);

  const naviagte = useNavigate();

  const dispatch = useDispatch();
  const getDetails = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/user", { data }, config);
      if (response.data.success) {

        console.log("domian",response.data.data.domainName);
        dispatch(setUrl(response.data.data));

        message.success(response.data.message);

naviagte("/webpage")      
} else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.log("error", error);
      message.error(error.message);
    }
  };
  return (
    <div className="row">
      <div className="col-4"></div>
      <div className="col-4 form">
        <form>
       <div className="input-text">
       <input type="text" onChange={(e)=>setData(e.target.value)} />

       </div>


          <div className="button">
          <button
          className="btn btn-outline-primary"
          type="button"
          onClick={() => getDetails()}
        >
          Get Insights
        </button>
          </div>
        </form>
      
      </div>
      <div className="col-4"></div>
    </div>
  );
}

export default Home;
