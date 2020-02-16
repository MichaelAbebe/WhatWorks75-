import React from "react";
import { Segment } from "semantic-ui-react";

export const StockTraining = () => {
  return (
    <div>
      <h1>Stock trading Videos</h1>
      <Segment>
        <iframe
          src='https://www.youtube.com/embed/fFfXIAcqhLE'
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          title='video'
          width='100%'
        />
      </Segment>
    </div>
  );
};
