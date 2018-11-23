import React, { Component } from "react";
import PropTypes from "prop-types";
import Dots from "./slider/Dots";
import Slider from "./slider/Slider";

const arrSliders = [
    {
        background: "bg-green",
        text: "Slider 1",
        content: "This is slider 1"
    },
    {
        background: "bg-red",
        text: "Slider 2",
        content: "This is slider 2"
    },
    {
        background: "bg-yellow",
        text: "Slider 3",
        content: "This is slider 3"
    },
    {
        background: "bg-pink",
        text: "Slider 4",
        content: "This is slider 4"
    }
];

class Sliders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
            autoplay: this.props.autoplay,
            arrow: this.props.arrow,
            dot: this.props.dot,
            loop: this.props.loop,
            arrSliders: arrSliders
        };
    }

    componentDidMount() {
        //check ${autoplay} setting to make slide auto move
        if (this.state.autoplay) {
            this.autoSlideshow();
        }
    }

    componentWillUnmount() {
        //stop auto move slide
        clearTimeout(this.timer);
    }

    //auto move to next slide after ${autoplayTime} setting
    autoSlideshow = () => {
        this.timer = setTimeout(() => {
            //call to move to next slide;
            this.nextSlide();
            //call this function again to call auto slide
            this.autoSlideshow();
        }, this.props.autoplayTime);
    };

    nextSlide = () => {
        var { slideIndex } = this.state;
        //slideIndex will start at 0 if current slide is end or move to next index
        slideIndex = slideIndex + 1;
        if (slideIndex <= arrSliders.length - 1) {
            this.setState({
                slideIndex: slideIndex
            });
        } else {
            clearTimeout(this.timer);
            if (this.props.loop) {
                this.setState({
                    slideIndex: 0
                });
            }
        }
    };

    prevSlide = () => {
        var { slideIndex } = this.state;
        //slideIndex will start at last slide if current slide is 0 or move to prev index
        slideIndex = slideIndex <= 0 ? arrSliders.length - 1 : slideIndex - 1;
        this.setState({
            slideIndex: slideIndex
        });
    };

    clickPrevSlide = () => {
        //stop auto slide
        clearTimeout(this.timer);
        //call to function prev slide
        this.prevSlide();
        //check ${autoplay} setting to make slide auto move
        if (this.state.autoplay) {
            this.autoSlideshow();
        }
    };

    clickNextSlide = () => {
        //stop auto slide
        clearTimeout(this.timer);
        //call to function prev slide
        this.nextSlide();
        //check ${autoplay} setting to make slide auto move
        if (this.state.autoplay) {
            this.autoSlideshow();
        }
    };

    onClickDot = state => {
        //check dot is active at current slide, if dot != current slide, move to index of dot
        if (state !== this.state.slideIndex) {
            //stop auto play
            clearTimeout(this.timer);
            this.setState({
                slideIndex: state
            });
            //check ${autoplay} setting to make slide auto move
            if (this.state.autoplay) {
                this.autoSlideshow();
            }
        }
    };

    onClickAutoPlay = () => {
        this.setState({
            autoplay: !this.state.autoplay,
            slideIndex: this.state.slideIndex
        });
        if (this.state.autoplay) {
            this.autoSlideshow();
        }
        console.log(this.state);
    };

    renderArrow = arrow => {
        if (arrow) {
            return (
                <div>
                    <button
                        type="button"
                        className="button-arrow"
                        onClick={() => this.clickPrevSlide()}
                        disabled={
                            !this.props.loop && this.state.slideIndex === 0
                        }
                    >
                        arrow prev
                    </button>
                    <button
                        type="button"
                        className="button-arrow"
                        onClick={() => this.clickNextSlide()}
                        disabled={
                            !this.props.loop &&
                            this.state.slideIndex === arrSliders.length - 1
                        }
                    >
                        arrow next
                    </button>
                </div>
            );
        }
    };

    renderDots = dot => {
        if (dot) {
            return (
                <Dots
                    arrSliders={this.state.arrSliders}
                    onClickDot={this.onClickDot}
                    slideIndex={this.state.slideIndex}
                />
            );
        }
    };

    showHideArrow = () => {
        this.setState({
            arrow: !this.state.arrow
        });
    };

    showHideDots = () => {
        this.setState({
            dot: !this.state.dot
        });
    };

    addNewSlide = () => {
        var { arrSliders } = this.state;
        var newSlide = {
            background: "bg-yellow",
            text: "New Slide",
            content: "This is new slide"
        };
        arrSliders.push(newSlide);
        this.setState({
            arrSliders: arrSliders
        });
    };

    render() {
        const { slideIndex, autoplay } = this.state;
        return (
            <div className="wrapper">
                <Slider
                    arrSliders={arrSliders}
                    settings={this.props}
                    slideIndex={slideIndex}
                />
                <div style={{ height: "70px" }}>
                    {this.renderDots(this.state.dot)}
                </div>
                <div style={{ height: "50px" }}>
                    {this.renderArrow(this.state.arrow)}
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={() => this.showHideArrow()}
                        className="button-arrow"
                    >
                        {this.state.arrow ? "Hide arrow" : "Show arrow"}
                    </button>
                </div>

                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={() => this.showHideDots()}
                        className="button-arrow"
                    >
                        {this.state.dot ? "Hide dots" : "Show dots"}
                    </button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={() => this.onClickAutoPlay()}
                        className="button-arrow"
                    >
                        {this.state.autoplay
                            ? "Disable autoplay"
                            : "Enable autoplay"}
                    </button>
                </div>
                <div style={{ marginTop: "20px" }}>
                    <button
                        onClick={() => this.addNewSlide()}
                        className="button-arrow"
                    >
                        add new slide
                    </button>
                </div>
            </div>
        );
    }
}

Sliders.propTypes = {
    dot: PropTypes.bool,
    loop: PropTypes.bool,
    slideToShow: PropTypes.number,
    slideToScroll: PropTypes.number,
    arrow: PropTypes.bool,
    autoplay: PropTypes.bool,
    autoplayTime: PropTypes.number
};

Sliders.defaultProps = {
    dot: true, // true: append dot
    loop: true,
    slideToShow: 1, //show slide
    slideToScroll: 1, //scroll slide
    arrow: true, //true: append arrow
    autoplay: true, //auto play slide
    autoplayTime: 3000 //time auto play slide
};

export default Sliders;
