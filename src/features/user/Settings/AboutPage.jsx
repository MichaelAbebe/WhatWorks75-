import React from "react";
import { Button, Divider, Form, Header, Segment } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

import TextInput from "../../../app/Common/Form/TextInput";
import TextArea from "../../../app/Common/Form/TextArea";
import PlaceInput from "../../../app/Common/Form/PlaceInput";
import SelectInput from "../../../app/Common/Form/SelectInput";

const interests = [
  {
    key: "Long term investment",
    text: "Long term investment ",
    value: "Long term investment"
  },
  {
    key: "Invest for vaccation",
    text: "Invest for vaccation",
    value: "Invest for vaccation"
  },
  {
    key: "Invest for Retierment",
    text: "Invest for Retierment ",
    value: "sInvest for Retierment"
  },
  { key: "Pay of Debt", text: "Pay of Debt", value: "Pay of Debt" },
  { key: "For Education", text: "For Education", value: "For Education" },
  { key: "Other", text: "Other", value: "Other" }
];

const AboutPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Header dividing size='large' content='About Me' />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Divider />
        <label>Tell us about yourself</label>
        <Field name='about' component={TextArea} placeholder='About Me' />
        <Field
          name='interests'
          component={SelectInput}
          options={interests}
          value='interests'
          multiple={true}
          placeholder='Select your interests'
        />
        <Field
          width={8}
          name='occupation'
          type='text'
          component={TextInput}
          placeholder='Occupation'
        />
        <Field
          width={8}
          name='origin'
          options={{ types: ["(regions)"] }}
          component={PlaceInput}
          placeholder='Country of Origin'
        />
        <Divider />
        <Button
          disabled={pristine || submitting}
          size='large'
          positive
          content='Update Profile'
        />
      </Form>
    </Segment>
  );
};

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false
})(AboutPage);
