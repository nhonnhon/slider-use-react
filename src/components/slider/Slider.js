import React, { Component } from "react";

const SingleSlide = ({arrSliders, width, classSlide}) => {
    var result = null;
    result = arrSliders.map((slider, index) => {
        return (
            <div key={index} className={`${slider.background} ${classSlide}`} style={{width: width}}>
                <h3>{slider.text}</h3>
                <p>{slider.content}</p>
            </div>
        )
    });
    return result
}

class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            widthContainer: 0,
            transformStart: 0,
            widthOfAllSlide: 0,
            widthOfEachSlide: 0,
            realWidth: 0,
            arrSliderAfter: [],
            arrSliderBefore: [],
            slideIndex: this.props.slideIndex,
            moveSlide: 0,
            arrSliders: this.props.arrSliders
        }
    }

    refCallback = element => {
        if (element) {
            var widthRender = element.getBoundingClientRect().width; //get attribute of element
            var arrSliders = this.state.arrSliders;
            var settings = this.props.settings;
            var slideIndex = this.state.slideIndex;
            var slideToScroll = settings.slideToScroll;
            var lengthSlider = arrSliders.length;
            if(widthRender > 0) {
                if (arrSliders) {
                    //caculate width of each slide
                    var widthOfEachSlide = widthRender / settings.slideToShow;
                    //real with of all slide without slide clone
                    var realWidth = widthOfEachSlide * lengthSlider;
                    //calculate px to move slide
                    //caculate width of all slide: curren slide + slide clone
                    var widthOfAllSlide = 0;
                    //create new arrSlider before and after for slide clone
                    var arrSliderAfter = [];
                    var arrSliderBefore = [];
                    if (!settings.loop) {
                        slideToScroll = 0;
                    }
                    arrSliderAfter = arrSliders.slice(0, slideToScroll);//clone after
                    arrSliderBefore = arrSliders.slice(lengthSlider - slideToScroll, lengthSlider);//clone before
                    widthOfAllSlide = widthOfEachSlide * (lengthSlider + slideToScroll * 2);//width of all slides with slide clone
                    var moveSlide = -((slideIndex + slideToScroll) * widthOfEachSlide);//width will transform slide
                    this.setState({
                        widthContainer: widthRender,
                        transformStart: moveSlide,
                        widthOfAllSlide: widthOfAllSlide,
                        widthOfEachSlide: widthOfEachSlide,
                        realWidth: realWidth,
                        arrSliderBefore: arrSliderBefore,
                        arrSliderAfter: arrSliderAfter,
                        moveSlide: moveSlide
                    })
                }
            }
        }
    }

    onTransform = () => {
        console.log(this.props.slideIndex)
        var slideToScroll = this.props.settings.slideToScroll;
        if (!this.props.settings.loop) {
            slideToScroll = 0;
        }
        var moveSlide = -((this.props.slideIndex + slideToScroll) * this.state.widthOfEachSlide);
        return moveSlide
    }

    render() {
        return (
            <div className='react-slider' ref={this.refCallback}>
                <div
                    className='slider-track' 
                    style={ {
                        width: this.state.widthOfAllSlide, 
                        transform: `translateX(${this.onTransform()}px)`,
                        transition: 'transform .5s ease'
                    } }
                >
                    {/* slide clone before */}
                    <SingleSlide 
                        arrSliders={this.state.arrSliderBefore} 
                        width={this.state.widthOfEachSlide}
                        classSlide='vn-slider slider-clone'
                    />
                    {/* current slide */}
                    <SingleSlide 
                        arrSliders={this.state.arrSliders} 
                        width={this.state.widthOfEachSlide}
                        classSlide='vn-slider'
                    />
                    {/* slide clone ater */}
                    <SingleSlide 
                        arrSliders={this.state.arrSliderAfter} 
                        width={this.state.widthOfEachSlide}
                        classSlide='vn-slider slider-clone'
                    />
                </div>
            </div>
        );
    }
}

export default Slider;
