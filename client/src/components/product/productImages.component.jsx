import React, { Component } from "react";

class ProductImages extends Component {
    state = {
        lightbox: false,
        impagePos: 0,
        lightboximages: [],
    };
    componentDidMount() {
        if (this.props.productDetail.images.length > 0) {
            let lightboximages = [];
            this.props.productDetail.images.forEach(image => {
                lightboximages.push(image.url);
            });
            this.setState({ lightboximages });
        }
    }
    handleLightbox = () => {};
    showThumbs = () =>
        this.state.lightboximages.map((image, i) =>
            i > 0 ? (
                <div
                    key={i}
                    onClick={() => this.handleLightbox(i)}
                    className="thumb"
                    style={{ background: `url(${image}) no-repeat` }}
                ></div>
            ) : null
        );
    renderCardImages = images => {
        if (images.length > 0) {
            return images[0].url;
        } else {
            return `/images/image_not_availble.png`;
        }
    };
    render() {
        const { productDetail } = this.props;
        return (
            <div className="product_image_container">
                <div className="main_pic">
                    <div
                        style={{
                            background: `url(${this.renderCardImages(
                                productDetail.images
                            )}) no-repeat`,
                        }}
                        onClick={() => this.handleLightbox(0)}
                    ></div>
                </div>
                <div className="main_thumbs">
                    {this.showThumbs(productDetail.images)}
                </div>
            </div>
        );
    }
}

export default ProductImages;
