import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { IdeasList } from './components/ideasList/IdeasList';
import { IdeasTakenList } from './components/ideasTakenList/IdeasTakenList';
import { NewIdea } from "./components/newIdea/NewIdea";
import './styles/ideasTeacher.scss'

const IdeasTeacher = () => {
  return (
    <section className="ideas-teacher-container m-4 fadeIn">

      <Row>
        <Col>
          <Tab.Container id="ideas-tabs" defaultActiveKey="first">
            <Nav variant="pills" className="nav-pills mb-5 justify-content-start align-items-center" id="pills-tab">
              <Nav.Item>
                <Nav.Link eventKey="first">Mis ideas</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Crear nueva idea</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Mis ideas tomadas</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content id="slideInUp">
              <Tab.Pane eventKey="first">
                <Row>
                  <IdeasList />
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Row>
                  <NewIdea />
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <Row>
                  <IdeasTakenList />
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </section>
  )
}

export default IdeasTeacher;