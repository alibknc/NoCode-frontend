import React, { useState, useEffect } from "react";
import { getAllTables, createTable } from "../../service/ApiService";
import CreateTableModal from '../../components/modals/CreateTableModal';
import '../../css/core.css'
import '../../css/Home.css'
import Navbar from '../../components/Sidebar/Navbar.js'
import { useParams } from 'react-router-dom';

function Tables() {
    const [loading, setLoading] = useState(true);
    const [project, setProject] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [newTableName, setNewTableName] = useState('');

    const { id, name } = useParams();

    const showModal = () => {
        setModalOpen(true)
    };

    const hideModal = () => {
        setModalOpen(false)
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        getAllTables(id).then(response => {
            console.log(response)
            setLoading(false)
            setProject(response)
        })
    }

    const saveData = (newTableName, columns) => {
        createTable(id, newTableName, columns).then(response => {
            console.log(response)
            setModalOpen(false)
            window.location.href = `/projects/${id}/content/${newTableName}`;
        })
    };

    return (
        <div>
            <Navbar id={id} name={name} />
            <div className="main-content">
                <div class="layout-page">
                    <div class="content-wrapper">
                        <div class="container-xxl flex-grow-1 container-p-y">
                            {modalOpen ? <CreateTableModal show={modalOpen} handleClose={hideModal} saveData={saveData}> </CreateTableModal> : <div></div>}
                            <h1 class="py-3 mb-4">Tablolarım</h1>
                            {loading ? <div className="spinner"></div> :
                                <div class="row">
                                    {project.tables.length != 0 ? project.tables.map((table, index) => (
                                            <div class="col-3">
                                                <div class="col-sm card border-primary mb-3" style={{ maxWidth: '18rem' }} key={table.id}>
                                                    <div class="card-header">Tablo {index + 1}</div>
                                                    <div class="card-body text-primary">
                                                        <h5 class="card-title">{table}</h5>
                                                        <a href={'/projects/' + id + '/content/' + table}><p class="card-text">Tabloyu incelemek için tıklayınız</p></a>
                                                    </div>
                                                </div>
                                            </div>
                                        )) : <div></div>
                                    }
                                    <div class="col-3">
                                        <div class="card border-primary mb-3" style={{ maxWidth: '18rem' }}>
                                            <div class="card-header">+</div>
                                            <div class="card-body text-primary">
                                                <h5 class="card-title">Yeni Tablo Oluştur</h5>
                                                <a href="#" onClick={showModal}><p class="card-text">Yeni bir tablo oluşturmak için tıklayınız</p></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tables;