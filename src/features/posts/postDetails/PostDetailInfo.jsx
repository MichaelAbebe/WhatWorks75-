import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";

const PostDetailInfo = ({ post }) => {
  return (
    <Segment.Group>
      <Segment attached='top'>
        <Grid>
          <Grid.Column width={1}>
            <Icon name='lightbulb outline' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{post.catalyst}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon name='calendar' size='large' color='teal' />
          </Grid.Column>
          <Grid.Column width={15}>{/* <span>{post.date}</span> */}</Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign='middle'>
          <Grid.Column width={1}>
            <Icon size='large' color='teal' name='info' />
          </Grid.Column>
          <Grid.Column width={11}>
            <p>{post.description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
export default PostDetailInfo;
