import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import DataTable from "../components/DataTable";
import DateTimePicker from "../components/DateTimePicker";

const Dashboard = () => {
  const user = localStorage.getItem("hamoye-user");
  const [flightDetails, setFlightDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [dateValue, setDateValue] = useState(
    moment(new Date()).format("YYYY-MM-DDTkk:mm")
  );
  const [filteredList, setFilteredList] = useState(flightDetails);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredList.slice(indexOfFirstData, indexOfLastData);
  const nPages = Math.ceil(filteredList.length / dataPerPage);

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
        setFilteredList(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg("Unable to fetch data");
        console.log(error);
        setIsLoading(false);
      });
  };

  const onChange = (e) => {
    console.log("Target", e.target.value);
    setDateValue(e.target.value);
  };

  const filterByDateTime = () => {
    const formattedValue = new Date(dateValue).getTime() / 1000;
    try {
      let result = flightDetails.filter((val) => {
        return val.firstSeen === formattedValue;
      });
      if (result.length === 0) {
        setErrorMsg("No data found");
      } else {
        setFilteredList(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="dashboard">
        <h3>Flights arriving and departing from all airports</h3>
        <DateTimePicker
          dateValue={dateValue}
          onChange={onChange}
          handleSearch={filterByDateTime}
        />
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
