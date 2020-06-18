import React from 'react'

import { Section, Heading, Content, CsProfileLink } from './components';
import './Messages.css';

function Messages({messages}) {
  return (
    <Section>
      <Heading>Messages</Heading>
      <Content>
        { messages.length ? (
          <div>
          message
          </div>
        ) : 'No messages. :-(' }
      </Content>
    </Section>
  );
}

export default Messages;
