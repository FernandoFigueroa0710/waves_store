import React, { Component } from "react";
import LightBox from "react-images";
class ImageLightbox extends Component {
    state = {
        lightboxIsOpen: true,
        currentImage: this.props.pos,
        images: [],
    };

    static getDerivedStateFromProps(props, state) {
        if (props.images) {
            const images = [];
            props.images.forEach(image => {
                images.push({ src: `${image}` });
            });
            return (state = {
                images,
            });
        }
        return false;
    }
    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    };
    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    };
    closeLightBox = () => {
        this.props.onClose();
    };
    render() {
        return (
            <LightBox
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={() => this.gotoPrevious()}
                onClickNext={() => this.gotoNext()}
                onClose={() => this.closeLightBox()}
            />
        );
    }
}

export default ImageLightbox;
