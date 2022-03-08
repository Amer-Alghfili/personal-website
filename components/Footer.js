import React from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineTwitter,
  AiFillYoutube,
} from "react-icons/ai";

function Footer() {
  return (
    <footer className="w-full p-4 flex items-center justify-center ">
      <div className="w-5/6 flex items-center justify-center">
        <ul className="text-3xl flex items-center ">
          <a
            href="https://www.youtube.com/channel/UCpyen0FpiP1bO3y9ykrUbZQ"
            className="cursor-pointer ms-4"
          >
            <AiFillYoutube />
          </a>
          <a
            href="https://github.com/Amer-Alghfili"
            className="cursor-pointer ms-4"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/amer-alghfili-abb4731b0/"
            className="cursor-pointer ms-4"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://twitter.com/AAlghfili"
            className="cursor-pointer ms-4"
          >
            <AiOutlineTwitter />
          </a>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
