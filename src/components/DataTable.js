import FlightDetails from "./FlightDetails";

const DataTable = ({ tableHead, tableData }) => {
  return (
    <table id="flights-table">
      <thead>
        <tr>
          {tableHead.map((headEl, index) => {
            return <th key={index}>{headEl}</th>;
          })}
        </tr>
      </thead>
      {tableData.map((flight, index) => (
        <FlightDetails key={index} flight={flight} />
      ))}
    </table>
  );
};

export default DataTable;
