/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import  axios  from "axios";
import { Context } from './../../main';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (!isAuthorized) {
    navigate("/login");
  }
  return (
    <>
      <section className="jobs page">
        <div className="container">
          <h1>ALL AVAILABLE JOB</h1>
          <div className="banner">
            {jobs.jobs &&
              jobs.jobs.map((element) => {
                return (
                  <div className="card" key={element._id}>
                    <p>{element.title}</p>
                    <p>{element.category}</p>
                    <p>{element.country}</p>
                    <Link to={`/job/${element._id}`}>Job Details</Link>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Jobs;
