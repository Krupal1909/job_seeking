/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useContext } from "react";
import { Context } from "./../../main";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    //fetching all employer jobs
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/job/getmyJobs`,
          { withCredentials: true }
        );
        const { data } = response;
        if (data && data.myJobs) {
          setMyJobs(data.myJobs);
        } else {
          toast.error("No jobs found");
          setMyJobs([]);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while fetching jobs");
        }
        setMyJobs([]);
      }
    };

    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigate("/");
  }

  //Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };
  const handleDisableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  //editing job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    // const updatedJob = myJobs.find((job) => job.id === jobId); --> yaha pr job._id likha bhul gaye the islye undefined aa rha tha
    await axios
      .put(`${API_URL}/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => toast.error(error.response.data.message));
  };

  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`${API_URL}/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map(
        (job) => (job._id === jobId ? { ...job, [field]: value } : job)
        // (job) => (job._id = jobId ? { ...job, [field]: value } : job)  --> tumne = use kiya tha jb ki === use kr na tha
      )
    );
  };
  return (
    <>
      <div className="myJobs page">
        <div className="container">
          <h3>Your Posted Jobs</h3>
          {myJobs.length > 0 ? (
            <>
              <div className="banner">
                {myJobs.map((element) => {
                  return (
                    <div className="card" key={element._id}>
                      <div className="content">
                        <div className="short_fields">
                          <div>
                            <span>Title: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.title}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <span>Country: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.country}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "country",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <span>City: </span>
                            <input
                              type="text"
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                              value={element.city}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "city",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <span>Category: </span>
                            <select
                              value={element.category}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "category",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value="">Select Category</option>
                              <option value="Graphics & Design">
                                Graphics & Design
                              </option>
                              <option value="Mobile App Development">
                                Mobile App Development
                              </option>
                              <option value="Frontend Web Development">
                                Frontend Web Development
                              </option>
                              <option value="MERN Stack Development">
                                MERN STACK Development
                              </option>
                              <option value="Account & Finance">
                                Account & Finance
                              </option>
                              <option value="Artificial Intelligence">
                                Artificial Intelligence
                              </option>
                              <option value="Video Animation">
                                Video Animation
                              </option>
                              <option value="MEAN Stack Development">
                                MEAN STACK Development
                              </option>
                              <option value="MEVN Stack Development">
                                MEVN STACK Development
                              </option>
                              <option value="Data Entry Operator">
                                Data Entry Operator
                              </option>
                            </select>
                          </div>

                          <div>
                            <span>
                              Salary:
                              {element.fixedSalary ? (
                                <input
                                  type="number"
                                  value={element.fixedSalary}
                                  onChange={(e) =>
                                    handleInputChange(
                                      element._id,
                                      "fixedSalary",
                                      e.target.value
                                    )
                                  }
                                  disabled={
                                    editingMode !== element._id ? true : false
                                  }
                                />
                              ) : (
                                <div>
                                  <input
                                    type="number"
                                    value={element.salaryFrom}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryFrom",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                  />
                                  <input
                                    type="number"
                                    value={element.salaryTo}
                                    onChange={(e) =>
                                      handleInputChange(
                                        element._id,
                                        "salaryTo",
                                        e.target.value
                                      )
                                    }
                                    disabled={
                                      editingMode !== element._id ? true : false
                                    }
                                  />
                                </div>
                              )}
                            </span>
                          </div>
                          <div>
                            <span>Expired:</span>
                            <select
                              value={element.expired}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "expired",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            >
                              <option value={true}>TRUE</option>
                              <option value={false}>FALSE</option>
                            </select>
                          </div>
                        </div>
                        <div className="long_field">
                          <div>
                            <span>Description:</span>
                            <textarea
                              rows="5"
                              value={element.description}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "description",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />
                          </div>

                          <div>
                            <span>Location:</span>
                            <textarea
                              rows="5"
                              value={element.location}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "location",
                                  e.target.value
                                )
                              }
                              disabled={
                                editingMode !== element._id ? true : false
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="button_wrapper">
                        <div className="edit_btn_wrapper">
                          {editingMode === element._id ? (
                            <>
                              <button
                                onClick={() => handleUpdateJob(element._id)}
                                className="check_btn"
                              >
                                <FaCheck />
                              </button>
                              <button
                                onClick={() => handleDisableEdit()}
                                className="cross_btn"
                              >
                                <RxCross2 />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleEnableEdit(element._id)}
                              className="edit_btn"
                            >
                              Edit
                            </button>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteJob(element._id)}
                          className="delete_btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <p>
              You Have not posted job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;
