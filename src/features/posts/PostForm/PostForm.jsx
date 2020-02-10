import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { reduxForm, Field } from "redux-form";
import { combineValidators, isRequired } from "revalidate";
import { connect } from "react-redux";
import { createPost, updatePost, cancelToggle } from "../PostAction";
import TextInput from "../../../app/Common/Form/TextInput";
import TextArea from "../../../app/Common/Form/TextArea";
import SelectInput from "../../../app/Common/Form/SelectInput";
import DateInput from "../../../app/Common/Form/DateInput";
import { withFirestore } from "react-redux-firebase";

const mapState = (state, ownProps) => {
  const postId = ownProps.match.params.id;

  let post = {};

  if (
    state.firestore.ordered.posts &&
    state.firestore.ordered.posts.length > 0
  ) {
    post =
      state.firestore.ordered.posts.filter(post => post.id === postId)[0] || {};
  }
  return { initialValues: post, post, loading: state.async.loading };
};

const actions = {
  createPost,
  updatePost,
  cancelToggle
};

const validate = combineValidators({
  ticker: isRequired({ message: "Stock Ticker is Requiered" }),
  forcast: isRequired({ message: "Forcast is Requiered" }),
  catalyst: isRequired({ message: "Catalyst is Requiered" }),
  date: isRequired({ message: "Catalyst date must be entered " })
});

const forcast = [
  { key: "bullish", text: "Bullish", value: "bullish" },
  { key: "bearish", text: "Bearish", value: "bearish" }
];
class PostForm extends Component {
  state = {
    ...this.props.post
  };

  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`posts/${match.params.id}`);

    // // console.log(post);
    // if (!post.exists) {
    //   history.push("/posts");
    //   toastr.error("Sorry", "Post not found");
  }
  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`posts/${match.params.id}`);
  }

  onFormSubmit = async values => {
    try {
      if (this.props.initialValues.id) {
        await this.props.updatePost(values);
        this.props.history.push(`/posts/${this.props.initialValues.id}`);
      } else {
        let createdPost = await this.props.createPost(values);
        this.props.history.push(`/posts/${createdPost.id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      history,
      initialValues,
      invalid,
      submitting,
      pristine,
      post,
      cancelToggle,
      loading
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment>
            <Form
              onSubmit={this.props.handleSubmit(this.onFormSubmit)}
              autoComplete='off'
            >
              <Header sub color='teal' content='Forcast' />
              <Field
                name='forcast'
                type='text'
                component={SelectInput}
                options={forcast}
                placeholder='Select Forcast '
              />
              <Header sub color='teal' content='Stock Ticker' />
              <Field
                name='ticker'
                component={TextInput}
                placeholder='Stock Ticker'
              />
              <Header sub color='teal' content='Catalyst' />
              <Field
                name='catalyst'
                component={TextInput}
                placeholder='Select Catalyst'
              />
              <Header sub color='teal' content='Catalyst Date' />
              <Field
                width={5}
                name='date'
                component={DateInput}
                dateFormat='dd LLL yyy'
                placeholder='Catalyst Date'
              />
              <Header sub color='teal' content='Description' />
              <Field
                name='description'
                component={TextArea}
                rows={5}
                placeholder='Description'
              />
              <Header sub color='teal' content='' />
              <Button
                disabled={invalid || submitting || pristine}
                loading={loading}
                positive
                type='submit'
              >
                Tip
              </Button>
              <Button
                type='button'
                onClick={
                  initialValues.id
                    ? () => history.push(`/posts/${initialValues.id}`)
                    : () => history.push("/posts")
                }
                disabled={loading}
              >
                Cancel
              </Button>

              {post.id && (
                <Button
                  type='button'
                  color={post.cancelled ? "green" : "red"}
                  floated='right'
                  content={post.cancelled ? "Reactivate Tip" : "Cancel Tip"}
                  onClick={() => cancelToggle(!post.cancelled, post.id)}
                />
              )}
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({ form: "PostForm", validate, enableReinitialize: true })(
      PostForm
    )
  )
);
