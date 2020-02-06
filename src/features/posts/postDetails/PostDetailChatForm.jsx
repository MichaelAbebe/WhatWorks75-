import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import Textarea from "../../../app/Common/Form/TextArea";
class PostDetailChatForm extends Component {
  handleCommentSubmit = values => {
    const { addPostComment, reset, postId, closeForm, parentId } = this.props;
    addPostComment(postId, values, parentId);
    reset();
    if (parentId !== 0) {
      closeForm();
    }
  };
  render() {
    return (
      <Form onSubmit={this.props.handleSubmit(this.handleCommentSubmit)}>
        <Field name='comment' type='text' component={Textarea} rows={2} />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    );
  }
}
export default reduxForm({ Fields: "comment" })(PostDetailChatForm);
