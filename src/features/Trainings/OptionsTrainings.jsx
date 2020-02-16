import React from "react";
import { Segment } from "semantic-ui-react";

export const OptionsTrainings = () => {
  return (
    <div>
      <h1>Otions trading Videos</h1>
      <Segment>
        <iframe
          src='https://www.youtube.com/embed/E7wJTI-1dvQ'
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
