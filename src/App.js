import axios from "axios";
import React, { useState, useEffect } from "react";
import brand from "./images/logo-dark-on-light.png";
import Profile from "./components/Profile";
import Sitters from "./components/Sitters";
import Bookings from "./components/Bookings";
import Login from "./components/Login";

function App() {
  const [token, setToken] = useState("");

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = credentials;

  const [userData, setUserData] = useState(null);
  const [sittersData, setSittersData] = useState(null);
  const [bookingsData, setBookingsData] = useState(null);
  const [bookingSearch, setBookingSearch] = useState(null);

  const [search, setSearch] = useState("");

  const axiosGet = (apiRoute, data) => {
    if (token) {
      axios
        .get(apiRoute, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (data === "user") {
            setUserData(response.data);
            console.log(response.data);
          } else if (data === "sitters") {
            setSittersData(response.data);
          } else if (data === "bookings") {
            setBookingsData(response.data);
          } else if (data === "search") {
            setBookingSearch(response.data);
            console.log(response.data);
          }
        })
        .catch((error) => alert(`Error retrieving data - ${error}`));
    }
  };

  const getCurrentUserData = () => {
    axiosGet("http://api-staging.joinbubble.co.uk/api/user", "user");
  };

  const searchForLocalSitters = () => {
    axiosGet("http://api-staging.joinbubble.co.uk/api/search", "sitters");
  };

  const activeBookingsForUser = () => {
    axiosGet(
      "http://api-staging.joinbubble.co.uk/api/booking/activesummary",
      "bookings"
    );
  };

  const getBooking = (id) => {
    axiosGet(`http://api-staging.joinbubble.co.uk/api/booking/${id}`, "search");
  };

  const refreshData = useEffect(() => {
    if (!userData) getCurrentUserData();
    if (!sittersData) searchForLocalSitters();
    if (!bookingsData) activeBookingsForUser();
  });

  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://api-staging.joinbubble.co.uk/auth/local", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200)
          setToken(response.data.token, () => refreshData());
      })
      .catch((error) => alert(`Error logging in - ${error}`));
  };

  const logout = () => {
    setToken("");
  }

  const getHourlyRate = (otherUserFullName) => {
    let firstAndLastNames = otherUserFullName.split(" ");
    firstAndLastNames[1] = firstAndLastNames[1].slice(0, 1) + ".";
    let formattedName = firstAndLastNames.join(" ");
    let sitter = sittersData.find(
      (sitter) => sitter.fullName === formattedName
    );
    return sitter.hourlyRate;
  };

  return (
    <div>
      {token.length > 0 ? (
        userData &&
        sittersData &&
        bookingsData && (
          <div>
            <img className="m-5" src={brand} alt="" width="260" />
            <button className="btn btn-outline-dark" onClick={()=>logout()}>Logout</button>
            <div className="row h-100 main-content">
              <div className="shadow col-lg-2 profile-col text-center rounded p-5 mt-3">
                <Profile userData={userData}/>
              </div>
              <div className="shadow col-lg-6 sitters-col text-center mt-3">
              <Sitters sittersData={sittersData}/>
              </div>
              <div className="shadow col-lg-4 bookings-col text-center mt-3">
                <Bookings search={search} setSearch={setSearch} getBooking={getBooking} bookingsData={bookingsData} 
                getHourlyRate={getHourlyRate} bookingSearch={bookingSearch}/>
              </div>
            </div>
          </div>
        )
      ) : (
        <div className="login-container">
          <Login setCredentials={setCredentials} credentials={credentials}
          email={email} password={password} login={login} />
        </div>
      )}
    </div>
  );
}

export default App;
