import React from 'react'

import { Section, Heading, Content } from './components';
import './Messages.css';

function Messages({messages}) {
  return (
    <Section>
      <Heading>Messages</Heading>
      <Content>
        { messages.length ? (
          <div>
          Messages coming up...
          </div>
        ) : 'No messages. :-(' }
      </Content>
    </Section>
  );
}

export default Messages;
