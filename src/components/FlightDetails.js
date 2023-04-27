const FlightDetails = (flight) => {
  const { icao24, firstSeen, estArrivalAirport, estDepartureAirport } =
    flight.flight;
  let unixTimeFormat = firstSeen * 1000;
  const date = new Date(unixTimeFormat).toLocaleTimeString();
  return (
    <div className="flight-details">
      <p>{`${icao24 ? icao24 : "N/A"} | ${date ? date : "N/A"} | ${estDepartureAirport ? estDepartureAirport : "N/A"} | ${estArrivalAirport ? estArrivalAirport : "N/A"}`}</p>
    </div>
  );
};

export default FlightDetails;
