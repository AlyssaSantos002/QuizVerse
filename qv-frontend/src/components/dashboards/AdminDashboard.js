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
                            <Nav.Item className="mb-4">
                                <Nav.Link eventKey="profile">Profile</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-4">
                                <Nav.Link eventKey="backlog">Quiz Approval Backlog</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-4">
                                <Nav.Link eventKey="qc">Quizzes Created</Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="mb-4">
                                <Nav.Link eventKey="qh">Quiz History</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="bg-light p-3 rounded-3 ms-3">
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