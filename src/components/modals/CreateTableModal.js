import { Button, Modal, Form, FormSelect } from "react-bootstrap";
import React, { Component } from "react";

class CreateTableModal extends Component {
    constructor(props) {
        super()
        this.state = { tableName: '', formFields: [{ columnName: "", dataType: "" }], fieldTypes: ["integer", "varchar", "date"] };
    }

    setTableName = (e) => {
        this.setState({ tableName: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.saveData(this.state.tableName, this.state.formFields);

        console.log("Table Name:", this.state.tableName);
        console.log("Form Fields:", this.state.formFields);
        this.setState({ formFields: [{ columnName: "", dataType: "" }], tableName: "" });
    };

    handleFormChange = (event, index) => {
        let data = [...this.state.formFields];
        data[index][event.target.name] = event.target.value;
        this.setState({ formFields: data });
    };

    addFields = () => {
        let object = {
            columnName: "",
            dataType: "",
        };

        this.setState({ formFields: [...this.state.formFields, object] });
    };

    removeFields = (index) => {
        if (index !== 0) {
            let data = [...this.state.formFields];
            data.splice(index, 1);
            this.setState({ formFields: data });
        }
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Tablo Oluştur</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <Form.Group className="col">
                                <Form.Label htmlFor="inputName">İsim</Form.Label>
                                <Form.Control type="text" id="inputName" onChange={this.setTableName} required />
                                {this.state.formFields.map((form, index) => {
                                    return (
                                        <div key={index} className="input-field">
                                            <br />
                                            <Form.Control
                                                name="columnName"
                                                className="input-box"
                                                placeholder="Sütun İsmi"
                                                onChange={(event) => this.handleFormChange(event, index)}
                                                value={form.columnName}
                                                required
                                            />
                                            <br />
                                            <FormSelect
                                                name="dataType"
                                                className="drop-btn"
                                                onChange={(event) => this.handleFormChange(event, index)}
                                                value={form.dataType}
                                                required
                                            >
                                                <option value="" className="drop-menu">
                                                    Veri Tipi Seçiniz
                                                </option>
                                                {this.state.fieldTypes.map((type, idx) => (
                                                    <option key={idx} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </FormSelect>
                                            <br />
                                            <Button
                                                className="remove-button"
                                                variant="secondary"
                                                onClick={() => this.removeFields(index)}
                                            >
                                                Sil
                                            </Button>
                                        </div>
                                    );
                                })}
                                <br />
                                <Button type="button" className="add-button" variant="secondary" onClick={this.addFields}>
                                    Yeni Sütun Ekle
                                </Button>
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

export default CreateTableModal;