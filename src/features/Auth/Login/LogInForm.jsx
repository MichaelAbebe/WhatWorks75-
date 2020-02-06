import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/Common/Form/TextInput";
import { logIn, socialLogin } from "../AuthActions";
import { connect } from "react-redux";
import SocialLogin from "../SocialLogin/SocialLogin";

const actions = {
  logIn,
  socialLogin
};
const LoginForm = ({ logIn, handleSubmit, error, socialLogin }) => {
  return (
    <Form size='large' onSubmit={handleSubmit(logIn)}>
      <Segment>
        <Field
          name='email'
          component={TextInput}
          type='text'
          placeholder='Email Address'
        />

        <Field
          name='password'
          component={TextInput}
          type='password'
          placeholder='password'
        />
        {error && (
          <Label basic color='red'>
            {error}
          </Label>
        )}

        <Button fluid size='large' color='teal'>
          Login
        </Button>
        <Divider horizontal>or</Divider>
        <SocialLogin socialLogin={socialLogin} />
      </Segment>
    </Form>
  );
};

export default connect(
  null,
  actions
)(reduxForm({ form: "LoginForm" })(LoginForm));
