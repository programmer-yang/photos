import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../loading";
import PropTypes from "prop-types";

const LoadingRender = (
  <div
    style={{
      height: "200px",
      backgroundColor: "rgba(0, 0, 0, 0)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
    key={Date.now()}
  >
    <Loading type="pacman" />
  </div>
);
const ListScrollPage = props => {
  const {
    onLoad,
    loaderRender,
    children,
    initLoad,
    element,
    threshold
  } = props;
  return (
    <InfiniteScroll
      element={element}
      pageStart={0}
      loadMore={onLoad}
      hasMore
      loader={loaderRender}
      useWindow={true}
      initialLoad={initLoad}
      threshold={threshold}
    >
      {children}
    </InfiniteScroll>
  );
};

ListScrollPage.propTypes = {
  onLoad: PropTypes.func.isRequired,
  loaderRender: PropTypes.element,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
  initLoad: PropTypes.bool,
  element: PropTypes.node,
  threshold: PropTypes.number
};
ListScrollPage.defaultProps = {
  loaderRender: LoadingRender,
  initLoad: false,
  element: "div",
  threshold: 250
};

export default ListScrollPage;
