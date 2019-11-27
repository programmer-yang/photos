import React from "react";
import ImageZoom from "react-medium-image-zoom";
import { clone } from "tuns-utils";
import cn from "classnames";
import Scroll from "../../components/listscroll";
import { getList } from "../request";
import styles from "./index.less";

const isWin = window.navigator.platform.indexOf("Win") >= 0;
const column = 3;

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    const photos = [...new Array(column)].map((_, index) => {
      return {
        id: `column_${index}`,
        height: 0,
        data: []
      };
    });
    this.state = {
      photos,
      imgWidth: window.document.body.clientWidth / 3
    };
  }

  componentDidMount() {
    this.getPhotoList();
  }

  getPhotoList = async (page = 0) => {
    const { photos, imgWidth } = this.state;
    const newPhotos = clone(photos);
    await new Promise(r => setTimeout(r, 400));
    const res = await getList(page + 1);
    res.forEach(item => {
      const index = newPhotos.findIndex(
        item => item.height === Math.min(...newPhotos.map(item => item.height))
      );
      newPhotos[index].data.push(item);
      newPhotos[index].height =
        newPhotos[index].height + (item.height / item.width) * imgWidth;
    });
    this.setState({ photos: newPhotos });
  };

  getPhotoDetail = url => {
    const api = "http://95.169.16.70:9002";
    return `${api}/api/photo?path=${encodeURIComponent(url)}`;
  };

  render() {
    const { photos, imgWidth } = this.state;
    const imgClassname = cn(styles.img, { [styles.imgWin]: isWin });

    return (
      <div className={styles.root}>
        <Scroll onLoad={this.getPhotoList} threshold={800}>
          <div className={styles.container}>
            {photos.map(item => (
              <div key={item.id} className={styles.column}>
                {item.data.map(dataItem => {
                  return (
                    <div
                      key={dataItem.id}
                      className={styles.item}
                      style={{
                        // width: imgWidth,
                        height: (dataItem.height / dataItem.width) * imgWidth
                      }}
                    >
                      <ImageZoom
                        key={item.id}
                        image={{
                          src: this.getPhotoDetail(dataItem.urls.small),
                          className: imgClassname
                          // onError: this.onImgLoadError.bind(this, index)
                        }}
                        zoomImage={{
                          src: this.getPhotoDetail(dataItem.urls.regular)
                        }}
                        defaultStyles={{
                          overlay: {
                            backgroundColor: "rgba(0, 0, 0, .96)"
                          }
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Scroll>
        {/* <img
          className={styles.item}
          src="https://images.unsplash.com/photo-1490773996481-9ff25c7d9484?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
          alt=""
        />
        <img
          className={styles.item}
          src="https://images.unsplash.com/photo-1499673987532-17bb21ac9596?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
          alt=""
        />
        <img
          className={styles.item}
          src="https://images.unsplash.com/photo-1498315025595-6d9a0b9b79a1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
          alt=""
        />
        <img
          className={styles.item}
          src="https://images.unsplash.com/photo-1490773996481-9ff25c7d9484?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEyMDd9"
          alt=""
        /> */}
      </div>
    );
  }
}

export default IndexPage;
