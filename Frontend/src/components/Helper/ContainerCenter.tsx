import { type ReactNode } from "react";
import { Container } from "react-bootstrap";

interface ContainerCenterProps {
  children: ReactNode | ReactNode[];
}
const ContainerCenter = ({ children }: ContainerCenterProps) => {
  return (
    <Container
      id="container-full-height"
      className="d-flex align-items-center justify-content-center"
    >
      {children}
    </Container>
  );
};

export default ContainerCenter;
