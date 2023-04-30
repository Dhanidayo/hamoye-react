import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/spinner";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchFlightDetails();

    return () => {
      fetchFlightDetails();
    };
  }, []);

  const fetchFlightDetails = async () => {
    setIsLoading(true);

    let config = {
      method: "get",
      url: "https://jsonplaceholder.typicode.com/todos",
    };

    axios
      .request(config)
      .then((response) => {
        const res = response.data;
        setData(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg("Unable to fetch data");
        console.log(error);
      });

    setIsLoading(false);
  };

  return (
    <div className="dashboard">
      <h3>JSON DATA</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Airport</th>
              <th>Time</th>
              <th>Departure</th>
              <th>Arriving</th>
            </tr>
          </thead>
          {isLoading ? (
            <Spinner />
          ) : (
            data.map((val, index) => (
              <div>
                <h4>{val.title}</h4>
                <p>{val.completed}</p>
              </div>
            ))
          )}
        </table>
      </div>
      {errorMsg && <div className="error">{errorMsg}</div>}
    </div>
  );
};

export default Dashboard;

