import { Button, Form, Modal } from "react-bootstrap";
import type { TNote } from "../../types/note.type";

interface NoteViewProps {
  note: TNote;
  show: boolean;
  handleCloseView: () => void;
}

const NoteViewModal = ({ note, show, handleCloseView }: NoteViewProps) => {
  return (
    <>
      <Modal show={show} onHide={handleCloseView}>
        <Modal.Header closeButton>
          <Modal.Title>{note.title}</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group>
            <Form.Control as="textarea" rows={15} readOnly={true} value={note.content} />
          </Form.Group>
        </Form>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NoteViewModal;
