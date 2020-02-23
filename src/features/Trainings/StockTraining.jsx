import React from "react";
import { Segment } from "semantic-ui-react";
// import { Segment } from "semantic-ui-react";
const style = {
  width: "50%",

  float: "left",

  padding: "15px"
};
export const StockTraining = () => {
  return (
    <div className='container'>
      <div className='videos' style={style}>
        <Segment>
          {" "}
          <h4>What is the Stock Market ? </h4>
          <iframe
            src='https://www.youtube.com/embed/ixF_wB2uvOs'
            title='1st video'
            allowFullScreen
            frameBorder='0'
            allow='autoplay; encrypted-media'
            width='100%'
            height='300px'
          ></iframe>
        </Segment>
      </div>
      <div className='videos' style={style}>
        <Segment>
          <h4>Stock Basics</h4>
          <iframe
            title='2nd video'
            src='https://www.youtube.com/embed/go75jhbHi3E'
            allowFullScreen
            frameBorder='0'
            width='100%'
            height='300px'
          />
        </Segment>
      </div>
      <div className='videos' style={style}>
        <Segment>
          {" "}
          <h4>How much money do i need to start stock trading ?</h4>
          <iframe
            src='https://www.youtube.com/embed/y_v0LQF4tks'
            title='3rd video'
            allowFullScreen
            frameBorder='0'
            width='100%'
            height='300px'
          ></iframe>
        </Segment>
      </div>

      <div className='videos' style={style}>
        <Segment>
          <h4>Shorting </h4>
          <iframe
            height='300px'
            src='https://www.youtube.com/embed/dR3MjbD6V1k'
            allowFullScreen
            frameBorder='0'
            // {/* allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' */}

            title='4th video'
          ></iframe>
        </Segment>
      </div>
    </div>
  );
};
