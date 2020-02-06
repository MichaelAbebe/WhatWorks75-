import React from "react";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import differenceInYears from "date-fns/difference_in_years";
import LazyLoad from "react-lazyload";
const UserDetailedHeader = ({ profile }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "unknown age";
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <LazyLoad  
                height={150}
                placeholder={<Item.Image avatar size='small' src='/Assets/user.png' />}>
              
              <Item.Image
                avatar
                size='small'
                src={profile.photoURL || "/Assets/user.png"}
              />
            </LazyLoad>

            <Item.Content verticalAlign='bottom'>
              <Header as='h1'>{profile.displayName}</Header>
              <br />
              <br />
              <Header as='h3'>{profile.occupation}</Header>
              <br />
              <Header as='h3'>
                Age: {age || "Unknown age"}, Lives in:{" "}
                {profile.city || "Unknown city"}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedHeader;
