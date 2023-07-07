import { Button, Modal, Form } from "react-bootstrap";
import React, { Component } from "react";

class ShowDetailsModal extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Detaylar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <h5 className="subtitle">Kişisel Bilgiler</h5>
                        <br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputName">İsim</Form.Label>
                                <Form.Control type="text" id="inputName" disabled value={this.props.data.name} />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputSurname">Soyisim</Form.Label>
                                <Form.Control type="text" id="inputSurname" disabled value={this.props.data.surname} />
                            </Form.Group>
                        </div><br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputIdentity">Kimlik No</Form.Label>
                                <Form.Control type="number" id="inputIdentity" disabled value={this.props.data.identityNumber} />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputBirthDate">Doğum Tarihi</Form.Label>
                                <Form.Control type="text" id="inputBirthDate" disabled value={this.props.data['birth-date']} />
                            </Form.Group>
                        </div><br />
                        <hr />
                        <h5 className="subtitle">İş Bilgileri</h5>
                        <br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputSalary">Maaş</Form.Label>
                                <Form.Control type="text" id="inputSalary" disabled value={this.props.data.jobInfo.salary} />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputStartDate">İşe Başlama Tarihi</Form.Label>
                                <Form.Control type="text" id="inputStartDate" disabled value={this.props.data.jobInfo['start-date']} />
                            </Form.Group>
                        </div><br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputLevel">Unvan</Form.Label>
                                <Form.Control type="text" id="inputLevel" disabled value={this.props.data.jobInfo.level} />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputPosition">Pozisyon</Form.Label>
                                <Form.Control type="text" id="inputPosition" disabled value={this.props.data.jobInfo.position} />
                            </Form.Group>
                        </div><br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputDepartment">Departman</Form.Label>
                                <Form.Control type="text" id="inputDepartment" disabled value={this.props.data.jobInfo.department} />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputWorkType">Çalışma Şekli</Form.Label>
                                <Form.Control type="text" id="inputWorkType" disabled value={this.props.data.jobInfo.workType} />
                            </Form.Group>
                        </div><br />
                        <hr />
                        <h5 className="subtitle">İletişim Bilgileri</h5>
                        <br />
                        <div className="row">
                            <Form.Group className="col-12">
                                <Form.Label htmlFor="inputAddress">Adres:</Form.Label>
                                <Form.Control type="text" id="inputAddress" disabled value={this.props.data.contactInfo.address}/>
                            </Form.Group>
                        </div><br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputCity">Şehir</Form.Label>
                                <Form.Control type="text" id="inputCity" disabled value={this.props.data.contactInfo.city} />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputCountry">Ülke</Form.Label>
                                <Form.Control type="text" id="inputCountry" disabled value={this.props.data.contactInfo.country} />
                            </Form.Group>
                        </div><br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputPostCode">Posta Kodu</Form.Label>
                                <Form.Control type="text" id="inputPostCode" disabled value={this.props.data.contactInfo.postCode} />
                            </Form.Group>
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputPhone">Telefon Numarası</Form.Label>
                                <Form.Control type="text" id="inputPhone" disabled value={this.props.data.contactInfo.phoneNumber} />
                            </Form.Group>
                        </div><br />
                        <div className="row">
                            <Form.Group className="col-6">
                                <Form.Label htmlFor="inputEmail">E-posta Adresi</Form.Label>
                                <Form.Control type="text" id="inputEmail" disabled value={this.props.data.contactInfo.email} />
                            </Form.Group>
                        </div><br />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.handleClose}>
                        Kapat
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default ShowDetailsModal;