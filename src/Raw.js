import React from 'react'
import JsonTree from 'react-json-tree';

import { Section, Heading } from './components';

function Raw({json}) {
  return (
    <Section>
      <Heading>Raw profile export</Heading>
      <JsonTree data={json} />
    </Section>
  );
}

export default Raw;
