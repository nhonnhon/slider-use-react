import React, { Component } from "react";

const SingleSlide = ({background, text, content, width}) => {
    return (
        <div className={`${background} vn-slider`} style={{width: width}}>
            <h3>{text}</h3>
            <p>{content}</p>
        </div>
    )
}

class Sliders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0
        }
    }

    refCallback = element => {
        if (element) {
            var widthRender = element.getBoundingClientRect().width; //
            this.setState({
                width: widthRender
            });
        }
    }

    getWidth = () => {
        console.log(this.state.width)
    }
    
    //calculate width for each slide
    setWidthForSlide = (slideToShow) => {
        const widthBrowser = window.innerWidth; //width of browser
        const widthOfSlide = widthBrowser / slideToShow; //set width for each slide
        return widthOfSlide;
    }

    //calculate width of all slide
    setWidthForAllSlide = (arrSliders , slideToShow) => {
        var widthOfEachSlide = this.setWidthForSlide(slideToShow);
        //width of current slides and + width of slide clone
        var widthOfAllSlide = widthOfEachSlide * (arrSliders.length + slideToShow * 2);
        return {
            width: widthOfAllSlide
        }
    }

    renderSlider = (arrSliders, settings) => {
        var currentWidth = this.state.width;
        console.log(currentWidth)
        console.log('1', currentWidth - 1)
        var result = null;
        if (arrSliders) {
            result = arrSliders.map((slider, index) => {
                return (
                    <SingleSlide 
                        key={index}
                        background={slider.background}
                        text={slider.text}
                        content={slider.content}
                        width={ this.setWidthForSlide(settings.slideToShow) }
                    />
                )
            })
        }
        return result;
    }

    render() {
        return (
            <div className='react-slider' ref={this.refCallback}>
                <div className='slider-track' style={this.setWidthForAllSlide(this.props.arrSliders, this.props.settings.slideToShow)}>
                    { this.renderSlider(this.props.arrSliders, this.props.settings) }
                </div>
            </div>
        );
    }
}

export default Sliders;
