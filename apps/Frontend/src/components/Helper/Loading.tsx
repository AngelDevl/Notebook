import { Spinner } from "react-bootstrap";
import { useLoading } from "../Context/LoadingContext";

const Loading = ({ width, height }: { width: string; height: string }) => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "rgba(255,255,255,0.8)",
        zIndex: 9999,
      }}
    >
      <Spinner animation="border" role="status" style={{ width, height }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
