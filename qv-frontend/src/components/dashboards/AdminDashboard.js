import './dashboard.css';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

import Profile from "./details/Profile";
import Backlog from "./details/Backlog";
import QuizzesCreated from "./details/QuizzesCreated";
import QuizHistory from "./details/QuizHistory";

export default function AdminDashboard({userData}){
    return(
        <div className="dashboard">
            <Tab.Container id="left-tabs-example" defaultActiveKey="profile">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item className="mb-3">
                                <Nav.Link eventKey="profile" className="text-white">
                                    PROFILE
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-3">
                                <Nav.Link eventKey="backlog" className="text-white">
                                    QUIZ APPROVAL BACKLOG
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-3">
                                <Nav.Link eventKey="qc" className="text-white">
                                    QUIZZES CREATED
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-3">
                                <Nav.Link eventKey="qh" className="text-white">
                                    QUIZ HISTORY
                                </Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="bg-light p-3 rounded-3">
                            <Tab.Pane eventKey="profile">
                                <Profile userData={userData}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="backlog">
                                <Backlog userData={userData}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="qc">
                                <QuizzesCreated userData={userData}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="qh">
                                <QuizHistory userData={userData}/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}