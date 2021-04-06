import React from "react";
import SearchIcon from "@material-ui/icons/Search";

export default function Bookings(props) {

    const {search, setSearch, getBooking, bookingsData, getHourlyRate, bookingSearch } = props;

    const getDay = (date) => {
        let day = new Date(date);
        day = day.getDay();
    
        switch (day) {
          case 0:
            return "Monday";
          case 1:
            return "Tuesday";
          case 2:
            return "Wednesday";
          case 3:
            return "Thursday";
          case 4:
            return "Friday";
          case 5:
            return "Saturday";
          case 6:
            return "Sunday";
          default:
            return "No day matched";
        }
      };
    
      const getDate = (date) => {
        let dateFormatted = new Date(date);
        return `${dateFormatted.getDate()}/${
          dateFormatted.getMonth() + 1
        }/${dateFormatted.getFullYear()}`;
      };

    return (<div><h3 className="mb-2">Your Bookings</h3>
    <div className="form-search d-flex align-items-center mb-5">
      <SearchIcon
        htmlColor="#55427A"
        fontSize="large"
        onClick={() => getBooking(search)}
      />
      <input
        className="form-control"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        name="search"
        value={search}
        id="search"
        placeholder="Search for booking"
        required
      />
      <label htmlFor="search" className="visually-hidden">
        Search
      </label>
    </div>
    <div className="text-start">
      <h4 className="mb-5">Confirmed Bookings</h4>
      {search.length === 0 ? (
        bookingsData.confirmedBookings.length > 0 ? (
          bookingsData.confirmedBookings.map((booking, index) => {
            return (
              <div className="shadow row booking-confirmed m-3 p-1">
                <div className="col text-start">
                  <h5>{booking.otherUserFullName}</h5>
                  <p>{booking.scheduledDuration} mins</p>
                  <p>
                    £
                    {(
                      getHourlyRate(booking.otherUserFullName) *
                      booking.scheduledDuration
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="col text-end">
                  <p>{getDay(booking.scheduledStart)}</p>
                  <p>{getDate(booking.scheduledStart)}</p>
                </div>
              </div>
            );
          })
        ) : (
          "You have no confirmed bookings"
        )
      ) : bookingSearch ? (
        <div className="shadow row booking-confirmed m-3 p-1">
          <div className="col text-start">
            <h5>{bookingSearch.bookedSitter.fullName}</h5>
            <p>{bookingSearch.scheduledDuration} hours</p>
            <p>£{bookingSearch.invoice.amountDue.toFixed(2)}</p>
          </div>
          <div className="col text-end">
            <p>{getDay(bookingSearch.scheduledStart)}</p>
            <p>{getDate(bookingSearch.scheduledStart)}</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <h4 className="mb-5">Requested Bookings</h4>
      {bookingsData.requestedBookings.length > 0
        ? bookingsData.requestedBookings.map((booking, index) => {
            return (
              <div className="shadow row booking-confirmed m-3 p-1">
                <div className="col text-start">
                  <h5>{booking.otherUserFullName}</h5>
                  <p>{booking.scheduledDuration} hours</p>
                  <p>{getDay(booking.scheduledStart)}</p>
                  <p>{getDate(booking.scheduledStart)}</p>
                </div>
              </div>
            );
          })
        : "You have no requested bookings"}
    </div></div>)
}