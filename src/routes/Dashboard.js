import React from 'react';
import "./Dashboard.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import DashboardService from '../services/DashboardService';
import AuthService from '../services/AuthService';
const Auth = new AuthService();
const DashboardService = new DashboardService();

export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            DashboardList: [],
            createDashboardModel: false,
            updateDashboardModel: false,
            id: null,
            name: '',
            description: '',
            image: '',
            technology: '',
            link: '',
            team: ''
        }
        this.baseState = {
            id: null,
            name: '',
            description: '',
            image: '',
            technology: '',
            link: '',
            team: ''
        };
    }

    resetState = event => {
        this.setState(this.baseState)
    }

    createDashboardModelFunc = (event) => {
        console.log("createDashboardModelFunc")
        this.setState({
            createDashboardModel: !this.state.createDashboardModel
        });
    }

    updateDashboardModelFunc = (event, Dashboard) => {
        this.setState({
            updateDashboardModel: !this.state.updateDashboardModel
        }, () => {
            if (this.state.updateDashboardModel) {
                let proj = JSON.parse(JSON.stringify(Dashboard));
                this.setState({
                    'id': proj._id,
                    /* 'name': proj.name,
                    'description': proj.description,
                    'image': proj.image,
                    'technology': proj.technology,
                    'link': proj.link,
                    'team': proj.team */
                })
            }
        })
    }

    componentWillMount() {
        if (!Auth.loggedIn()) {
            this.props.history.replace('/login')
        }
        else {
            try {
                this.getDashboards();
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleAddSubmit = event => {
        event.preventDefault();
        let body = {
            'name': this.state.name,
            'description': this.state.description,
            'image': this.state.image,
            'technology': this.state.technology,
            'link': this.state.link,
            'team': this.state.team
        }
        DashboardService.create(body)
            .then(res => {
                if (res._id) {
                    alert("Dashboard added successfully");
                    this.resetState();
                    this.createDashboardModelFunc();
                    this.getDashboards();
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => {
                alert(err);
            })
    }

    handleUpdateSubmit = (event) => {
        event.preventDefault();
        let body = {
            'name': this.state.name,
            'description': this.state.description,
            'image': this.state.image,
            'technology': this.state.technology,
            'link': this.state.link,
            'team': this.state.team
        }
        let id = this.state.id;
        DashboardService.update(id, body)
            .then(res => {
                alert(res.message);
                this.resetState();
                this.updateDashboardModelFunc();
                this.getDashboards();
            })
            .catch(err => {
                alert(err);
            })
    }

    handleDelete = (event, Dashboard) => {
        let id = Dashboard._id;
        console.log(id);
        DashboardService.delete(id)
            .then(res => {
                alert(res.message)
                this.getDashboards();
            })
            .catch(err => {
                alert(err);
            })

    }

    getDashboards() {
        DashboardService.list().then(Dashboards => {
            let temp = JSON.parse(JSON.stringify(Dashboards));
            console.log(temp);
            temp = temp.sort(function (a, b) {
                if (a.team > b.team)
                    return 1
                else
                    return -1
            })
            this.setState({ DashboardList: temp })
        })
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-primary" onClick={this.createDashboardModelFunc}>Create Dashboard</button>
                    </div>
                </div>
                <br />
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Image</th>
                            <th scope="col">Technology</th>
                            <th scope="col">Link</th>
                            <th scope="col">Team</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {this.state.DashboardList.map((Dashboard, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{Dashboard.name}</td>
                                    <td>{Dashboard.description}</td>
                                    <td>{Dashboard.image ? <img src={Dashboard.image} alt={Dashboard.image} style={{ height: '50px', width: '50px' }} /> : ''}</td>
                                    <td>{Dashboard.technology}</td>
                                    <td>{Dashboard.link}</td>
                                    <td>{Dashboard.team}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={event => this.updateDashboardModelFunc(event, Dashboard)}>Update</button></td>
                                    <td><button type="button" className="btn btn-danger" onClick={event => this.handleDelete(event, Dashboard)}>Delete</button></td>
                                </tr>
                            );
                        })}

                    </tbody>
                </table>
                {this.state.createDashboardModel ? (<div>
                    <form onSubmit={this.handleAddSubmit}>
                        <Modal isOpen={this.state.createDashboardModel} toggle={this.createDashboardModelFunc} className={this.props.className}>
                            <ModalHeader toggle={this.createDashboardModelFunc}>Add Dashboard</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" value={this.state.description} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="text" className="form-control" id="image" aria-describedby="imageHelp" placeholder="Enter image" value={this.state.image} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="technology">Technology</label>
                                    <input type="text" className="form-control" id="technology" aria-describedby="technologyHelp" placeholder="Enter technology" value={this.state.technology} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="link">Link</label>
                                    <input type="text" className="form-control" id="link" aria-describedby="linkHelp" placeholder="Enter link" value={this.state.link} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team">Team</label>
                                    <input type="text" className="form-control" id="team" aria-describedby="teamHelp" placeholder="Enter team" value={this.state.team} onChange={this.handleChange} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleAddSubmit}>Add</Button>{' '}
                                <Button color="secondary" onClick={this.createDashboardModelFunc}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </form>
                </div>) : null}
                {this.state.updateDashboardModel ? (<div>
                    <form onSubmit={this.handleUpdateSubmit}>
                        <Modal isOpen={this.state.updateDashboardModel} toggle={this.updateDashboardModelFunc} className={this.props.className}>
                            <ModalHeader toggle={this.updateDashboardModelFunc}>Update Dashboard</ModalHeader>
                            <ModalBody>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="nameHelp" placeholder="Enter name" value={this.state.name} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control" id="description" aria-describedby="descriptionHelp" placeholder="Enter description" value={this.state.description} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image">Image</label>
                                    <input type="text" className="form-control" id="image" aria-describedby="imageHelp" placeholder="Enter image" value={this.state.image} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="technology">Technology</label>
                                    <input type="text" className="form-control" id="technology" aria-describedby="technologyHelp" placeholder="Enter technology" value={this.state.technology} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="link">Link</label>
                                    <input type="text" className="form-control" id="link" aria-describedby="linkHelp" placeholder="Enter link" value={this.state.link} onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="team">Team</label>
                                    <input type="text" className="form-control" id="team" aria-describedby="teamHelp" placeholder="Enter team" value={this.state.team} onChange={this.handleChange} />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.handleUpdateSubmit}>Update</Button>{' '}
                                <Button color="secondary" onClick={this.updateDashboardModelFunc}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </form>
                </div>) : null}
            </div>);
    }
}