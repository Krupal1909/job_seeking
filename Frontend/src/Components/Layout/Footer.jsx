/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaGithub, FaYoutube, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By KrupalPatel.</div>
      <div>
        <Link
          to={"https://www.linkedin.com/in/krupal-patel-1b2973263/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
        <Link to={"https://github.com/Krupal1909"} target="_blank">
          <FaGithub />
        </Link>
        <Link
          to={"https://www.youtube.com/channel/UCVik--olI1sHRcWZxJ09bZg"}
          target="_blank"
        >
          <FaYoutube />
        </Link>
        <Link
          to={"https://api.whatsapp.com/send?phone=919624843552"}
          target="_blank"
        >
          <FaWhatsapp />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
