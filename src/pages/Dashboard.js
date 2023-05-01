import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  const user = localStorage.getItem("hamoye-user");
  const [flightDetails, setFlightDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = flightDetails.slice(indexOfFirstData, indexOfLastData);
  const nPages = Math.ceil(flightDetails.length / dataPerPage);

  useEffect(() => {
    fetchFlightDetails();

    return () => {
      fetchFlightDetails();
    };
  }, []);

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
        setFlightDetails(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg("Unable to fetch data");
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="dashboard">
        <h3>Flights arriving and departing from all airports</h3>
        {errorMsg ? (
          <div className="error">{errorMsg}</div>
        ) : (
          <div className="flights">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <DataTable
                  tableHead={["Airport", "Time", "Arriving", "Departing"]}
                  tableData={currentData}
                />
                <Pagination
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  pageLimit={5}
                />
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
