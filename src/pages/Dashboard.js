import { useEffect, useState } from "react";
import axios from "axios";
import FlightDetails from "../components/FlightDetails";

const Dashboard = () => {
  const user = localStorage.getItem("hamoye-user");
  const [flightDetails, setFlightDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      if (!user) {
        return;
      }
      setIsLoading(true);

      let config = {
        method: "get",
        url: "https://opensky-network.org/api/flights/all?begin=1517227200&end=1517230800",
        headers: {
          Cookie: "XSRF-TOKEN=9a014e9f-274c-42d5-be87-597f0671e3ea",
        },
      };

      axios
        .request(config)
        .then((response) => {
          const res = response.data;
          console.log("Response>>>>>", res);
          setFlightDetails(res);
        })
        .catch((error) => {
          console.log(error);
        });

      setIsLoading(false);
    };

    fetchFlightDetails();
  }, [user]);

  return (
    <div className="dashboard">
      <h3>Flights arriving and departing from all airports</h3>
      <div className="flights">
        <table id="flights-table">
          <thead>
            <tr>
              <th>Airport</th>
              <th>Time</th>
              <th>Departure</th>
              <th>Arriving</th>
            </tr>
          </thead>
          {isLoading ? <div>Loading...</div> :
            flightDetails.map((flight, index) => (
              <FlightDetails key={index} flight={flight} />
            ))}
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
