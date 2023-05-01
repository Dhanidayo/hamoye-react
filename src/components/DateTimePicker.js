const DateTimePicker = ({ dateValue, onChange, handleSearch }) => {
    return (
        <>
            <div className="date-container">
              <input
                type="datetime-local"
                name="datetime"
                id="datetime"
                // min={new Date().toISOString().slice(0, -8).split('T')[0]}
                value={dateValue}
                onChange={onChange}
              />
              <button onClick={handleSearch} className="search-btn" >Search</button>
            </div>
        </>
    );
}
 
export default DateTimePicker;