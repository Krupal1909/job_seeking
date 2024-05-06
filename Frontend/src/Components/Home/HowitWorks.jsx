/* eslint-disable no-unused-vars */
import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import {IoMdSend} from "react-icons/io" 
const HowitWorks = () => {
  return (
    <div className="howitworks">
      <div className="container">
        <h3>How JobZee Works</h3>
        <div className="banner">
          <div className="card">
            <FaUserPlus />
            <p>Create Account</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum,
              adipisci repellendus eum quidem aperiam ipsam corporis, cupiditate
              natus quas dicta hic fuga cum expedita dolorum veritatis culpa
              quisquam placeat sapiente?
            </p>
          </div>
          <div className="card">
            <MdFindInPage />
            <p>Find a Job/Post A Job</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum,
              adipisci repellendus eum quidem aperiam ipsam corporis, cupiditate
              natus quas dicta hic fuga cum expedita dolorum veritatis culpa
              quisquam placeat sapiente?
            </p>
          </div>
          <div className="card">
            <IoMdSend />
            <p>Send Message</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum,
              adipisci repellendus eum quidem aperiam ipsam corporis, cupiditate
              natus quas dicta hic fuga cum expedita dolorum veritatis culpa
              quisquam placeat sapiente?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowitWorks;
