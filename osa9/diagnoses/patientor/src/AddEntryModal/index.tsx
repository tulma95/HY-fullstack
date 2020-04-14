import React from 'react';
import { Modal, Segment, Button } from 'semantic-ui-react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
}

const AddEntryModal = ({ modalOpen, onClose }: Props) => {
  return (
    <Modal open={modalOpen}>
      <Button onClick={onClose}>close</Button>
    </Modal>
  );
};

export default AddEntryModal;
