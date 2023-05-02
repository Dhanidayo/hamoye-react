const DateTimePicker = ({ dateValue, onChange, handleSearch }) => {
  return (
    <>
      <div className="date-container">
        <input
          type="datetime-local"
          name="datetime"
          id="datetime"
          value={dateValue}
          onChange={onChange}
        />
        <button onClick={handleSearch} className="search-btn">
          Search
        </button>
      </div>
    </>
  );
};

export default DateTimePicker;
