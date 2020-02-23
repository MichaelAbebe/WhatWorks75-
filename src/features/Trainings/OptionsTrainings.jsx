import React from "react";
import { Segment } from "semantic-ui-react";

const style = {
  width: "50%",

  float: "left",

  padding: "15px"
};
export const OptionsTrainings = () => {
  return (
    <div>
      <div className='container'>
        <div className='videos' style={style}>
          <Segment>
            {" "}
            <h4>Options Trading Basics</h4>
            <iframe
              title='OPtions video 1'
              src='https://www.youtube.com/embed/ipf0Yg2Z4Gs'
              allow='autoplay; encrypted-media'
              frameBorder='0'
              allowFullScreen
              width='100%'
              height='300px'
            ></iframe>
          </Segment>
        </div>
        <div className='videos' style={style}>
          <Segment>
            <h4>Call vs Put Options Basic</h4>
            <iframe
              title='OP;tions Second Video'
              src='https://www.youtube.com/embed/uQLMSU2NNlk'
              allow='autoplay; encrypted-media'
              width='100%'
              height='300px'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </Segment>
        </div>
        <div className='videos' style={style}>
          <Segment>
            {" "}
            <h4>Optons Trading Terminology Call/Put</h4>
            <iframe
              title='3rd video'
              src='https://www.youtube.com/embed/xV1XubO-sBI'
              allow='autoplay; encrypted-media'
              width='100%'
              height='300px'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </Segment>
        </div>

        <div className='videos' style={style}>
          <Segment>
            <h4>How do options work ? </h4>
            <iframe
              title='4th Video'
              src='https://www.youtube.com/embed/rCdYDyXmZ5Y'
              allow='autoplay; encrypted-media'
              width='100%'
              height='300px'
              frameBorder='0'
              allowFullScreen
            ></iframe>
          </Segment>
        </div>
      </div>
    </div>
  );
};
