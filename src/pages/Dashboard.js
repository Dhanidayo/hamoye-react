import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { GrUndo } from "react-icons/gr";
import Spinner from "../components/Spinner";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import DataTable from "../components/DataTable";
import DateTimePicker from "../components/DateTimePicker";
import {
  getCurrentDate,
  getLast2Hrs,
  getLast2HrsWithParam,
  getTimeStamp,
} from "../utils/helpers";

const Dashboard = () => {
  const user = localStorage.getItem("hamoye-user");
  const [state, setState] = useState({
    flightDetails: [],
    totalFlights: 0,
    isLoading: false,
    errorMsg: "",
    dateValue: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
  });
  const { flightDetails, totalFlights, isLoading, errorMsg, dateValue } = state;
  const [filteredList, setFilteredList] = useState(flightDetails);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(20);
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredList.slice(indexOfFirstData, indexOfLastData);
  const nPages = Math.ceil(filteredList.length / dataPerPage);

  //getting time
  const currentDate = getCurrentDate();
  const last2hrsTime = getLast2Hrs();
  const beginTimeStamp = getTimeStamp(last2hrsTime);
  const endTimestamp = getTimeStamp(currentDate);

  useEffect(() => {
    (async () => {
      await fetchFlightDetails(beginTimeStamp, endTimestamp);
    })();

    return () => {
      fetchFlightDetails(beginTimeStamp, endTimestamp);
    };
  }, [beginTimeStamp, endTimestamp]);

  const fetchFlightDetails = async (begin, end) => {
    if (!user) {
      return;
    }
    setState((state) => ({
      ...state,
      isLoading: true,
      totalFlights: 0,
    }));

    let config = {
      method: "get",
      url: `https://opensky-network.org/api/flights/all?begin=${begin}&end=${end}`,
      headers: {
        Cookie: "XSRF-TOKEN=9a014e9f-274c-42d5-be87-597f0671e3ea",
      },
    };

    axios
      .request(config)
      .then((response) => {
        const res = response.data;
        setState((state) => ({
          ...state,
          flightDetails: res,
          totalFlights: res.length,
          isLoading: false,
        }));
        setFilteredList(res);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          console.log(error);
          setState((state) => ({
            ...state,
            errorMsg: "No data found",
            totalFlights: "0",
            isLoading: false,
          }));
        } else {
          console.log(error);
          setState((state) => ({
            ...state,
            errorMsg: "Unable to fetch data",
            totalFlights: "0",
            isLoading: false,
          }));
        }
      });
  };

  const onChange = (e) => {
    setState((state) => ({
      ...state,
      dateValue: e.target.value,
    }));
  };

  const filterByDateTime = async () => {
    const last2hrs = getLast2HrsWithParam(dateValue);
    const selectedTimeStamp = getTimeStamp(dateValue);
    const last2hrsTimestamp = getTimeStamp(last2hrs);

    try {
      await fetchFlightDetails(last2hrsTimestamp, selectedTimeStamp);
    } catch (error) {
      console.error(error);
    }
  };

  const reset = () => {
    window.location.reload(false);
  };

  return (
    <>
      <div className="dashboard">
        <h3>Flights arriving and departing from all airports</h3>
        <div className="flex-container">
          <div>
            <span>{totalFlights} flights</span>
          </div>
          <DateTimePicker
            dateValue={dateValue}
            onChange={onChange}
            handleSearch={filterByDateTime}
          />
          <div className="reset-btn tooltip" onClick={reset}>
            <GrUndo size={20} />
            <span className="tooltiptext">reset back to current flights</span>
          </div>
        </div>
        {errorMsg ? (
          <div className="error">{errorMsg}</div>
        ) : (
          <div className="flights">
            {isLoading ? (
              <Spinner />
            ) : (
              filteredList.length !== 0 && (
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
              )
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
