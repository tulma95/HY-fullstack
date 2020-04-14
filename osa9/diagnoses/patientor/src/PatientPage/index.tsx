import React from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { useStateValue, changePatient } from '../state';
import { Header, Icon, Card, Button } from 'semantic-ui-react';
import EntryComponent from '../components/EntryComponent';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [{ patient }, dispatch] = useStateValue();

  React.useEffect(() => {
    const fetchPatient = async (id: string) => {
      const { data: patient } = await Axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      dispatch(changePatient(patient));
    };
    if (patient?.id !== id) {
      fetchPatient(id);
    }
  }, [id, dispatch, patient]);

  if (!patient) return <div>loading</div>;
  return (
    <div>
      <Header as="h1">
        {patient.name}{' '}
        <Icon name={patient.gender[0] === 'M' ? 'male' : 'female'} />
      </Header>
      <Header as="h3">ssn: {patient.ssn}</Header>
      <Header as="h3">occupation: {patient.occupation}</Header>
      <Header as="h3">Entries</Header>

      <Button onClick={() => setModalOpen(true)}>Add entry</Button>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />

      <Card.Group itemsPerRow="1">
        {patient.entries.map(entry => (
          <EntryComponent key={entry.id} entry={entry} />
        ))}
      </Card.Group>
    </div>
  );
};

export default PatientPage;
