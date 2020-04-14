import React from 'react';
import { Entry, HealthCheckEntry } from '../types';
import { assertNever } from '../utils';
import { Card, Header, CardDescription, Icon } from 'semantic-ui-react';

const HealthCheckEntryC: React.FC<{ entry: HealthCheckEntry }> = ({
  entry
}) => {
  return (
    <Card>
      <Card.Content>
        <Header content={entry.date} />
        <Icon size="big" name="user doctor" />
        <CardDescription>{entry.description}</CardDescription>
        {entry.healthCheckRating}
      </Card.Content>
    </Card>
  );
};

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Header content={entry.date} />
        <Icon size="big" name="hospital" />
        <CardDescription>{entry.description}</CardDescription>
      </Card.Content>
    </Card>
  );
};

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  return (
    <Card>
      <Card.Content>
        <Header content={entry.date} />
        <Icon size="big" name="heartbeat" />
        <CardDescription>{entry.description}</CardDescription>
      </Card.Content>
    </Card>
  );
};

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckEntryC entry={entry} />;

    case 'Hospital':
      return <HospitalEntry entry={entry} />;

    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default EntryComponent;
