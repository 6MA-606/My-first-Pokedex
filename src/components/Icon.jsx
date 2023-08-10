import PropTypes from "prop-types";

export const ShinyIcon = (props) => {
  const { className } = props;

  return (
    <svg
      width={"2rem"}
      height={"2rem"}
      viewBox="1 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M2 15.5429C2 15.1544 2.3024 14.8426 2.67287 14.8107C6.59694 14.4725 9.72566 11.2033 10.0493 7.10309C10.0798 6.71598 10.3783 6.4 10.75 6.4C11.1217 6.4 11.4202 6.71598 11.4507 7.10309C11.7743 11.2033 14.9031 14.4725 18.8271 14.8107C19.1976 14.8426 19.5 15.1544 19.5 15.5429C19.5 15.9313 19.1976 16.2431 18.8271 16.275C14.9031 16.6132 11.7743 19.8824 11.4507 23.9826C11.4202 24.3697 11.1217 24.6857 10.75 24.6857C10.3783 24.6857 10.0798 24.3697 10.0493 23.9826C9.72566 19.8824 6.59694 16.6132 2.67287 16.275C2.3024 16.2431 2 15.9313 2 15.5429Z" />
      <path d="M16 7.31429C16 7.00355 16.2419 6.75409 16.5383 6.72855C19.6776 6.45802 22.1805 3.84267 22.4394 0.562468C22.4639 0.252784 22.7026 0 23 0C23.2974 0 23.5361 0.252784 23.5606 0.562468C23.8195 3.84267 26.3224 6.45802 29.4617 6.72855C29.7581 6.75409 30 7.00355 30 7.31429C30 7.62502 29.7581 7.87448 29.4617 7.90002C26.3224 8.17055 23.8195 10.7859 23.5606 14.0661C23.5361 14.3758 23.2974 14.6286 23 14.6286C22.7026 14.6286 22.4639 14.3758 22.4394 14.0661C22.1805 10.7859 19.6776 8.17055 16.5383 7.90002C16.2419 7.87448 16 7.62502 16 7.31429Z" />
      <path d="M14.25 26.0571C14.25 25.8047 14.4466 25.602 14.6874 25.5812C17.238 25.3614 19.2717 23.2365 19.482 20.5713C19.5019 20.3197 19.6959 20.1143 19.9375 20.1143C20.1791 20.1143 20.3731 20.3197 20.393 20.5713C20.6033 23.2365 22.637 25.3614 25.1876 25.5812C25.4284 25.602 25.625 25.8047 25.625 26.0571C25.625 26.3096 25.4284 26.5123 25.1876 26.5331C22.637 26.7529 20.6033 28.8778 20.393 31.543C20.3731 31.7946 20.1791 32 19.9375 32C19.6959 32 19.5019 31.7946 19.482 31.543C19.2717 28.8778 17.238 26.7529 14.6874 26.5331C14.4466 26.5123 14.25 26.3096 14.25 26.0571Z" />
    </svg>
  );
};

ShinyIcon.propTypes = {
  className: PropTypes.string,
};

export const ArrowRight = (props) => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
      />
    </svg>
  );
};

ArrowRight.propTypes = {
  className: PropTypes.string,
};

export const ArrowUp = (props) => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"
      />
    </svg>
  );
};

ArrowUp.propTypes = {
  className: PropTypes.string,
};

export const ChevronLeft = (props) => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
};

ChevronLeft.propTypes = {
  className: PropTypes.string,
};

export const ChevronRight = (props) => {
  const { className } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};

ChevronRight.propTypes = {
  className: PropTypes.string,
};
