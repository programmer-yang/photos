import React from "react";
import { getUnsplashData } from "./request";

class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }
  componentDidMount() {
    getUnsplashData().then(imgData => {
      // console.log(imgData);

      this.imgRef.current.src = URL.createObjectURL(imgData);
    });
  }

  render() {
    return (
      <div>
        <img alt="" ref={this.imgRef} />
      </div>
    );
  }
}

export default TestPage;
