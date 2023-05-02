const Pagination = ({ nPages, currentPage, setCurrentPage, pageLimit }) => {

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  
  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button className="page-link" onClick={prevPage}>
            {"<<"}
          </button>
        </li>
        {getPaginationGroup().map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active-btn" : "inactive-btn"} `}
          >
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" onClick={nextPage}>
            {">>"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
