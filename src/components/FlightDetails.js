import moment from "moment";

const FlightDetails = (flight) => {
  const {
    firstSeen,
    estDepartureAirport,
    estDepartureAirportHorizDistance,
    estArrivalAirportHorizDistance,
  } = flight.flight;
  let unixTimeFormat = firstSeen * 1000;
  const date = moment(unixTimeFormat)
    .format("YYYY-MM-DDTkk:mm A")
    .split("T")[1];
  return (
    <tbody>
      <tr>
        <td>{estDepartureAirport ? estDepartureAirport : "N/A"}</td>
        <td>{date ? date : "N/A"}</td>
        <td>
          {estArrivalAirportHorizDistance
            ? estArrivalAirportHorizDistance
            : "N/A"}
        </td>
        <td>
          {estDepartureAirportHorizDistance
            ? estDepartureAirportHorizDistance
            : "N/A"}
        </td>
      </tr>
    </tbody>
  );
};

export default FlightDetails;
