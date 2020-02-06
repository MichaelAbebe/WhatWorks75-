import React from "react";
import { Card, Grid, Header, Image, Segment, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const panes = [
  { menuItem: "All Posts", panse: { key: "allPosts" } },
  { menuItem: "Past Posts", panse: { key: "pastPosts" } },
  { menuItem: "Future Posts", panse: { key: "futurePosts" } },
  { menuItem: "Your Tips ", panse: { key: "hosted" } }
];

const UserDetailedEvents = ({ posts, postsLoading, changeTab }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={postsLoading}>
        <Header icon='calendar' content='Posts' />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />

        <Card.Group itemsPerRow={5}>
          {posts &&
            posts.map(post => (
              <Card as={Link} to={`/posts/${post.id}`} key={post.id}>
                <Image src={`/Assets/stock-chart/${post.ticker}.jpg`} />
                <Card.Content>
                  <Card.Header textAlign='center'>{post.ticker}</Card.Header>
                  <Card.Meta textAlign='center'>
                    <div>
                      {format(
                        post.date && post.date.toDate(),
                        "DD MMM YYYY"
                      )}
                    </div>
                    {/* <div>
                      {format(post.date && post.date.toDate(), "h:mm a")}
                    </div> */}
                  </Card.Meta>
                </Card.Content>
              </Card>
            ))}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedEvents;
