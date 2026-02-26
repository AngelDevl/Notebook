import { FilePlusCorner, NotebookTabs } from "lucide-react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../css/feature.css"

const Features = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row className="justify-content-center g-4 w-100">
        <Col md={5} lg={4}>
          <Card
            body
            onClick={() => navigate("/notes/new", { replace: true })}
            id="feature-card"
            className="text-center shadow-sm"
          >
            <h1>Create Note</h1>
            <FilePlusCorner size={48} />
          </Card>
        </Col>
        <Col md={5} lg={4}>
          <Card
            body
            onClick={() => navigate("/notes", { replace: true })}
            id="feature-card"
            className="text-center shadow-sm"
          >
            <h1>My Notes</h1>
            <NotebookTabs size={48} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Features;
