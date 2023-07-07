import { Button, Modal } from "react-bootstrap";
import React, { Component } from "react";

class SuccessModal extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kayıt Başarılı</Modal.Title>
                </Modal.Header>
                <Modal.Body>Veri başarıyla kaydedildi.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Tamam
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default SuccessModal;