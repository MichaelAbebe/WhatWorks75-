import React from "react";
import { Grid } from "semantic-ui-react";
import { TrainingsNav } from "./TrainingsNav";
import { StockTraining } from "./StockTraining";
import { Switch, Redirect, Route } from "react-router-dom";
import { OptionsTrainings } from "./OptionsTrainings";

export const TrainingsDashboard = () => {
  return (
    <Grid>
      <Grid.Column width={3}>
        <TrainingsNav />
      </Grid.Column>
      <Grid.Column width={12}>
        <Switch>
          <Redirect exact from='trainings' to='/trainings/stocktrainings' />
          <Route
            path='/trainings/stocktrainings'
            render={() => <StockTraining />}
          />
          <Route
            path='/trainings/optionTrainings'
            render={() => <OptionsTrainings />}
          />
        </Switch>
      </Grid.Column>
    </Grid>
  );
};
