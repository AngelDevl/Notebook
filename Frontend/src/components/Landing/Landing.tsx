import Features from "./Features";
import ContainerCenter from "../Helper/ContainerCenter";
import { Row } from "react-bootstrap";

const Landing = () => {
  return (
    <ContainerCenter>
      <Row className="justify-content-center g-4 w-100">
        <h1 className="text-center mb-4" style={{ color: "white" }}>
          My Notebook
        </h1>
        <Features />
      </Row>
    </ContainerCenter>
  );
};

export default Landing;
