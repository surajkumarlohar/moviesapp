import React, { useState, useEffect, useRef } from "react";

function Summary(props) {
  const [show, setShow] = useState(null);
  const [details, setDetails] = useState({
    MovieName: props.showName,
    Name: "",
    Mobile: "",
    Comment: "",
  });
  const ref = useRef(null);

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  function handleClicking() {
    localStorage.setItem("bookingDetails", JSON.stringify(details));
    console.log("Details saved to local storage:", details);
    alert("Your request registered with us")
    ref.current.click();

  }

  function handleClick() {
    ref.current.click();
  }

  useEffect(() => {
    props.setProgress(10);
    fetch(`https://api.tvmaze.com/search/shows?q=${props.showName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setShow(data[0].show); // Set the matched show if available
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
    props.setProgress(100);
  }, [props.showName]);

  return (
    <div>
      {show && (
        <div className="px-4 py-5 my-5 text-center">
          <img
            className="d-block mx-auto mb-4"
            src={show.image ? show.image.medium : "blank"}
            alt=""
            width="400"
            height="400"
          />
          <h1 className="display-5 fw-bold text-body-emphasis">{show.name}</h1>
          <div className="col-lg-6 mx-auto">
            <p
              className="lead mb-4"
              dangerouslySetInnerHTML={{ __html: show.summary }}
            ></p>
            <p className="lead mb-4">Type: {show.type}</p>
            <p className="lead mb-4">Language: {show.language}</p>
            <p className="lead mb-4">Status: {show.status}</p>
            <p className="lead mb-4">Premiered: {show.premiered}</p>
            <p className="lead mb-4">Ended: {show.ended}</p>
            <a href={show.url}>Official Site</a>

            <div className="d-grid gap-2 my-2 d-sm-flex justify-content-sm-center">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 gap-3"
                onClick={handleClick}
              >
                Book Now
              </button>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            ref={ref}
          >
            Launch static backdrop modal
          </button>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Enter Details to Book
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="moviename" className="form-label">
                      Movie Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="text"
                      name="MovieName"
                      onChange={onChange}
                      value={details.MovieName}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="Name"
                      placeholder="Enter Your Full Name"
                      onChange={onChange}
                      value={details.Name}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">
                      Mobile no:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="mobile"
                      name="Mobile"
                      placeholder="Enter your Mobile no"
                      onChange={onChange}
                      value={details.Mobile}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="comment" className="form-label">
                      Comment:
                    </label>
                    <textarea
                      className="form-control"
                      id="comment"
                      rows="3"
                      name="Comment"
                      onChange={onChange}
                      value={details.Comment}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleClicking}
                    className="btn btn-primary"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
