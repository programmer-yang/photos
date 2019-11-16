import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import Loading from "../loading";
import PropTypes from "prop-types";

const LoadingRender = (
  <div
    style={{
      height: "200px",
      backgroundColor: "rgba(204, 51, 102, .1)",
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
  const { onLoad, loaderRender, children, initLoad } = props;
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={onLoad}
      hasMore
      loader={loaderRender}
      useWindow={true}
      initialLoad={initLoad}
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
  initLoad: PropTypes.bool
};
ListScrollPage.defaultProps = {
  loaderRender: LoadingRender,
  initLoad: false
};

export default ListScrollPage;
