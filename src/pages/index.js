import React from "react";
import Scroll from "../components/listscroll";
import ImageZoom from "react-medium-image-zoom";
import cn from "classnames";

import styles from "./index.less";

const isWin = window.navigator.platform.indexOf("Win") >= 0;

class IndexPage extends React.Component {
  state = {
    ids: []
  };
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    await new Promise(r => setTimeout(r, 1500));
    const { ids } = this.state;
    this.setState({
      ids: [...ids, ...[...Array(12)].map(() => this.getId())]
    });
  };

  getId = () => {
    return parseInt(Math.random() * 1000 + 1, 10);
  };

  onImgLoadError = errId => {
    const { ids } = this.state;
    const newIds = [...ids];
    newIds[errId] = this.getId();
    this.setState({
      ids: newIds
    });
  };

  render() {
    const { ids } = this.state;
    const imgClassname = cn(styles.img, { [styles.imgWin]: isWin });
    return (
      <div className={styles.root}>
        <Scroll onLoad={this.getData}>
          <div className={styles.item}>
            {ids.map((id, index) => (
              <ImageZoom
                key={index}
                image={{
                  src: `https://picsum.photos/id/${id}/480/270.jpg`,
                  className: imgClassname,
                  onError: this.onImgLoadError.bind(this, index)
                }}
                zoomImage={{
                  src: `https://picsum.photos/id/${id}/1600/900.jpg`
                }}
                defaultStyles={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, .96)"
                  }
                }}
              />
            ))}
          </div>
        </Scroll>
      </div>
    );
  }
}

export default IndexPage;
