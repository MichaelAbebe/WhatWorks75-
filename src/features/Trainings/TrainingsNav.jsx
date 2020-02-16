import React from "react";
import { Menu, Header } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

export const TrainingsNav = () => {
  return (
    <div>
      <Menu vertical>
        <Header attached inverted color='grey' content='Trainings' />
        <Menu.Item as={NavLink} to='/trainings/stockTrainings'>
          Stock Trading Videos
        </Menu.Item>
        <Menu.Item as={NavLink} to='/trainings/optionTrainings'>
          Option Trading Videos
        </Menu.Item>
      </Menu>
    </div>
  );
};
