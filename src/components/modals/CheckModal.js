import { Button, Modal } from "react-bootstrap";
import React, { Component } from "react";

class CheckModal extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Emin Misiniz?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Silme işlemini onaylıyor musunuz? Bu işlem geri alınamaz!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Vazgeç
                    </Button>
                    <Button variant="danger" onClick={this.props.checkResult}>
                        Sil
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default CheckModal;