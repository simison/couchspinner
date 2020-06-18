import React from 'react'

import { Section, Heading, Content } from './components';
import JsonTree from 'react-json-tree';
import './Raw.css';

function Raw({json}) {
  return (
    <Section>
      <Heading>Raw profile export</Heading>
      <JsonTree data={json} />
    </Section>
  );
}

export default Raw;
