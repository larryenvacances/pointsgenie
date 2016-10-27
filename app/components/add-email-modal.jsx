import React, { PropTypes } from "react";
import { Modal, Input, Button} from "react-bootstrap";

const AddEmailModal = React.createClass({
    displayName: "AddEmailModal",

  propTypes: {
    user: PropTypes.object,
    onFormSubmit: PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      invalid: {},
      email: '',
    };
  },

  getFormData() {
    return {
        cip: this.props.user.cip,
        email: this.state.email,
    }
  },


  isValidEmail(email) {
    return email.match(/^[a-z0-9_\.\-]+@usherbrooke.ca$/i)
  },

  handleChange() {
    let state = {
      isValid: true,
      invalid: {},
      email: this.refs.email.getValue(),
    };

    if (this.isValidEmail(this.state.email)) {
      state.isValid = false;
      state.invalid.email = true;
    }

    this.setState(state);
  },

  handleSubmit(e) {
    this.props.onRequestHide();
    this.props.onFormSubmit(this.props.user.id, this.getFormData(), e);
  },

  renderInput() {
    return (
      <Input type="text" ref="email" label="Adresse couriel" placeholder="Entrer l'adresse couriel."
        value={this.state.email} onChange={this.handleChange} />
    );
  },

  renderSubmitButton() {
    return (
      <Button type="submit" disabled={!this.state.isValid || this.props.isSubmitting} bsStyle="success" >
        Valider le courriel
      </Button>
    );
  },

    render() {
        let { user, onFormSubmit, isSubmitting, ...props } = this.props;
        const title = `Modifier le profil de ${user.name}`;

        return (
        <Modal {...props} title={title} animation={true}>
            <form onSubmit={this.handleSubmit} role="form">
            <div className="modal-body">
            {this.renderInput()}
            </div>
            <div className="modal-footer">
            {this.renderSubmitButton()}
            </div>
            </form>
        </Modal>
        );
    }
});

export default AddEmailModal;
