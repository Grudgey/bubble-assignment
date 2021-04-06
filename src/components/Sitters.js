import React from "react";
import profileDefault from "../images/profile_default.png";
import superSitter from "../images/super_sitter.png";

export default function Sitters(props) {

    const {sittersData} = props;

    return (<div><h1 className="mb-5">Search For Sitters</h1>
    {sittersData.map((sitter, index) => {
      return (
        <div key={index} className="row mb-5 p-3">
          <div className="col-4 text-end">
            <img
              className="rounded-circle m-3"
              src={profileDefault}
              width="75"
              height="75"
              alt="Sitters information"
            ></img>
          </div>
          <div className="col-8 text-start">
            <div className="row align-items-center">
              <div className="col text-start">
                <h4>
                  {sitter.firstName} {sitter.lastName}
                </h4>
              </div>
              <div className="col">
                {sitter.ratingPercentage === 100 ? (
                  <div className="d-flex align-items-center">
                    <img
                      className="rounded-circle m-3"
                      src={superSitter}
                      width="50"
                      height="50"
                      alt="Super sitter"
                    />
                    <p>Super Sitter!</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col text-end">
                <p>£{sitter.hourlyRate}/hr</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>"{sitter.biography}"</p>
              </div>
            </div>
          </div>
        </div>
      );
    })}</div>)
}