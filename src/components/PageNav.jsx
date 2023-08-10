import PropTypes from "prop-types";

const PageNav = (props) => {
  const { currentPage, onChangePage } = props;

  return (
    <>
      {currentPage - 3 > 0 ? (
        <>
          <div onClick={() => onChangePage(1)}>1</div>
          <div>...</div>
        </>
      ) : null}
      <div onClick={() => onChangePage(currentPage - 2)}>
        {currentPage > 2 ? currentPage - 2 : null}
      </div>
      <div onClick={() => onChangePage(currentPage - 1)}>
        {currentPage > 1 ? currentPage - 1 : null}
      </div>
      <div className="text-neutral-300 font-bold">
        <select
          className="bg-neutral-600 border-2 border-neutral-700 rounded-md"
          onChange={(e) => onChangePage(parseInt(e.target.value))}
          value={currentPage}
        >
          {Array.from(Array(44).keys()).map((num) => (
            <option key={num} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>
      <div onClick={() => onChangePage(currentPage + 1)}>
        {currentPage < 44 ? currentPage + 1 : null}
      </div>
      <div onClick={() => onChangePage(currentPage + 2)}>
        {currentPage < 43 ? currentPage + 2 : null}
      </div>
      {44 - currentPage > 2 ? (
        <>
          <div>...</div>
          <div onClick={() => onChangePage(44)}>44</div>
        </>
      ) : null}
    </>
  );
};

PageNav.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default PageNav;
