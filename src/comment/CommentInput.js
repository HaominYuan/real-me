import React, { Component } from "react";
import PropTypes from "prop-types";
import "./comment.scss";
import wrapWithLoadData from "./wrapWithLoadData";

class CommentInput extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.any.isRequired,
    saveData: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: this.props.data,
      content: "",
    };
  }

  componentDidMount() {
    this.textarea.focus();
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      this.props.onSubmit({
        username: this.state.username,
        content: this.state.content,
        createdTime: +new Date(),
      });
    }
    this.setState({ content: "" });
  }

  handleUsernameBlur(event) {
    this.props.saveData(event.target.value);
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">用户名：</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onBlur={this.handleUsernameBlur.bind(this)}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">评论内容：</span>
          <div className="comment-field-input">
            <textarea
              ref={(textarea) => (this.textarea = textarea)}
              value={this.state.content}
              onChange={this.handleContentChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>发布</button>
        </div>
      </div>
    );
  }
}

CommentInput = wrapWithLoadData(CommentInput, "username");
export default CommentInput;
