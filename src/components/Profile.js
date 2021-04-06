import React from "react";
import profileImage from "../images/profile-image-example.png";
import boyIcon from "../images/boy-white.png";
import girlIcon from "../images/girl-white.png";
import EmailIcon from "@material-ui/icons/Email";
import PhoneIcon from "@material-ui/icons/Phone";

export default function Profile(props) {

    const { userData } = props;

    return (<div><h2>Hi {userData.firstName}</h2>
        <img className="rounded-circle m-3" src={profileImage} alt="Your Profile"></img>
        <div className="d-flex justify-content-center mb-5">
          {userData.children.map((child, index) => {
            return (
              <img
                key={index}
                src={child.gender === 0 ? boyIcon : girlIcon}
                width="50"
                height="50"
                alt="Children icons"
              />
            );
          })}
        </div>
        <h3>About You</h3>
        <p>"{userData.biography}"</p>
        <div className="d-flex justify-content-center mt-3">
          <PhoneIcon htmlColor="white" />
          <p>{userData.mobileNumber}</p>
        </div>
        <div className="d-flex justify-content-center mb-5">
          <EmailIcon htmlColor="white" />
          <p>{userData.email}</p>
        </div></div>)
}