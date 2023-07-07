import { Button, Modal, Form } from "react-bootstrap";
import React, { Component } from "react";

class CreateProjectModal extends Component {
    constructor(props) {
        super()
        this.state = { projectName: '' };
    }

    handleChange = (e) => {
        this.setState({ projectName: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.saveData(this.state.projectName);
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Proje Oluştur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputName">İsim</Form.Label>
                                <Form.Control type="text" id="inputName" onChange={this.handleChange} required />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Kapat
                    </Button>
                    <Button variant="success" onClick={this.handleSubmit}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default CreateProjectModal;