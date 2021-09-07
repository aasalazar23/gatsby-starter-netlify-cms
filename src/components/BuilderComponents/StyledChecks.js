import React from "react";
import PropTypes from "prop-types";

const StyledChecks = ({ data }) => {
  const { bgColor, fgColor, mediaPosition = "column", textColor, list } = data;

  return (
    <div
      className="styledChecks component"
      style={{ backgroundColor: bgColor, padding: "4rem" }}
    >
      <ul
        className="styledChecks__list"
        style={{
          maxWidth: "1000px",
          margin: "auto",
          display: "flex",
          flexDirection: mediaPosition,
          justifyContent: "space-between",
        }}
      >
        {!!list &&
          list.map((item, index) => {
            const { title, content } = item;
            return (
              <li
                key={index}
                className="item"
                style={{ listStyle: "none", marginLeft: "2rem" }}
              >
                <div
                  className="item__head"
                  style={{ display: "flex", color: textColor }}
                >
                  <div
                    className="item__head__check"
                    style={{
                      backgroundColor: fgColor,
                      width: "25px",
                      height: "25px",
                      lineHeight: "10px",
                      fontWeight: "bold",
                      borderRadius: "305px",
                      textAlign: "center",
                      padding: "15px",
                      fontSize: "4rem",
                      marginRight: "15px",
                      display: "flex",
                      alignContent: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    ✓
                  </div>
                  <h2
                    className="item__head__title"
                  >
                    {title}
                  </h2>
                </div>
                <p className="item__content" style={{ padding: "1rem" }}>
                  {content}
                </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

StyledChecks.propTypes = {
  data: PropTypes.shape({
    bgColor: PropTypes.string,
    list: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        content: PropTypes.string,
      })
    ),
  }),
};

export default StyledChecks;
