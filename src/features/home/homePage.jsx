import React from "react";
import {
  Segment,
  Container,
  Header,
  Image,
  Button,
  Icon
} from "semantic-ui-react";

const homePage = ({ history }) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          WhatWorks
        </Header>
        <Button onClick={() => history.push("/posts")} size="huge" inverted>
          Get started
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
};
export default homePage;
