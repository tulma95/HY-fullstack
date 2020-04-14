import React, { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';

import PatientListPage from './PatientListPage';
import PatientPage from './PatientPage';
import { useStateValue, setDiagnoseList } from './state';
import { DiagnoseEntry } from './types';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatientList = async () => {
      const { data: dataApi } = await axios.get<DiagnoseEntry[]>(
        `${apiBaseUrl}/diagnoses`
      );
      dispatch(setDiagnoseList(dataApi));
    };
    fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Route exact path="/" render={() => <PatientListPage />} />
          <Route path="/:id" render={() => <PatientPage />} />
        </Container>
      </Router>
    </div>
  );
};

export default App;
