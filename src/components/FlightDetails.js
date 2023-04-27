const FlightDetails = (flight) => {
  const { icao24, firstSeen, estArrivalAirport, estDepartureAirport } =
    flight.flight;
  let unixTimeFormat = firstSeen * 1000;
  const date = new Date(unixTimeFormat).toLocaleTimeString();
  return (
    <tbody>
      <tr>
        <td>{icao24 ? icao24 : "N/A"}</td>
        <td>{date ? date : "N/A"}</td>
        <td>{estDepartureAirport ? estDepartureAirport : "N/A"}</td>
        <td>{estArrivalAirport ? estArrivalAirport : "N/A"}</td>
      </tr>
    </tbody>
  );
};

export default FlightDetails;
