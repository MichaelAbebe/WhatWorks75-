import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignedIn = ({ signOut, profile, auth }) => {
  return (
    <Menu.Item position='right'>
      <Image
        avatar
        spaced='right'
        src={profile.photoURL || "Assets/user.png"}
      />
      <Dropdown pointing='top left' text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to='/createPost'
            text='Create Post'
            icon='plus'
          />
          <Dropdown.Item text='My Posts' icon='calendar' />
          <Dropdown.Item text='My Network' icon='users' />
          <Dropdown.Item
            as={Link}
            to={`/profile/${auth.uid}`}
            text='My Profile'
            icon='user'
          />
          <Dropdown.Item
            as={Link}
            to='/settings/basic'
            text='Settings'
            icon='settings'
          />
          <Dropdown.Item onClick={signOut} text='Sign Out' icon='power' />

          <Dropdown.Item disabled center>
            Version 0.0.1
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
export default SignedIn;
