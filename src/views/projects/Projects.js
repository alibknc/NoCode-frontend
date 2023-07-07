import React from "react";
import { getAllProjects, createProject } from "../../service/ApiService";
import CreateProjectModal from '../../components/modals/CreateProjectModal';
import authReducer from "../../reducers/authReducer";
import '../../css/core.css'
import { Link } from 'react-router-dom';

class Projects extends React.Component {
    constructor() {
        super()
        this.state = { loading: true, projects: [], user: "" }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal = () => {
        this.setState({ modalOpen: true });
    };

    hideModal = () => {
        this.setState({ modalOpen: false });
    };

    componentDidMount() {
        const user = authReducer.getUser()
        this.setState({ user: user }, () => this.getData());
    }

    getData() {
        getAllProjects(this.state.user.id).then(response => {
            this.setState({ loading: false, projects: response });
        })
    }

    saveData = (newProjectName) => {
        createProject(this.state.user.id, newProjectName).then(response => {
            console.log(response)
            this.setState({ modalOpen: false });
            window.location.href = '/projects';
        })
    };

    render() {
        return (
            <div class="layout-page">
                <div class="content-wrapper">
                    <div class="container-xxl flex-grow-1 container-p-y">
                        {this.state.modalOpen ? <CreateProjectModal show={this.state.modalOpen} handleClose={this.hideModal} saveData={this.saveData}> </CreateProjectModal> : <div></div>}
                        <h1 class="py-3 mb-4">Projelerim</h1>
                        {this.state.loading ? <div className="spinner"></div> :
                            <div class="row">
                                {this.state.projects.map((project, index) => (
                                    <div class="col-3">
                                        <div class="col-sm card border-primary mb-3" style={{ maxWidth: '18rem' }} key={project.id}>
                                            <div class="card-header">Proje {index + 1}</div>
                                            <div class="card-body text-primary">
                                                <h5 class="card-title">{project.title}</h5>
                                                <Link to={`/projects/${project.id}`}>
                                                    <p class="card-text">Projeyi incelemek için tıklayınız</p>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div class="col-3">
                                    <div class="card border-primary mb-3" style={{ maxWidth: '18rem' }}>
                                        <div class="card-header">+</div>
                                        <div class="card-body text-primary">
                                            <h5 class="card-title">Yeni Proje Oluştur</h5>
                                            <a href="#" onClick={this.showModal}><p class="card-text">Yeni bir proje oluşturmak için tıklayınız</p></a>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div >
                </div>
            </div>
        );
    }
};

export default Projects;