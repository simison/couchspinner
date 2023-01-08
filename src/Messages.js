import React, { useState } from 'react';
import { marked } from 'marked';
import Modal from 'react-modal';

import './Messages.scss';
import { formatDate } from './utils';
import { Section, Heading, Content, CsProfileName } from './components';

// http://reactcommunity.org/react-modal/accessibility/
Modal.setAppElement('#root');

function otherMemberId(ids, userId) {
  if (!ids || !userId) {
    return;
  }

  return parseInt(
    ids
      .split(',')
      .filter(id => parseInt(id, 10) !== userId)
      .pop(),
  );
}

function Messages({ messages, userId, names }) {
  const [openThread, setOpenThread] = useState(false);

  return (
    <Section>
      <Heading>Messages</Heading>
      <Content>
        {messages.length ? (
          <>
            {messages.map(thread => {
              // Other profile IDs than your own
              const profileId = otherMemberId(
                thread?.user_ids_concatenated,
                userId,
              );

              // Unique ID for message thread
              const threadId = `${thread?.user_ids_concatenated}-${thread?.created_at}`;

              return (
                <button
                  className="Message"
                  key={threadId}
                  onClick={() =>
                    thread.messages.length > 0 && setOpenThread(thread)
                  }
                >
                  <CsProfileName
                    className="Profile-reference-type"
                    names={names}
                    id={profileId}
                  />
                  <div className="Message-preview">
                    {thread.messages[thread.messages.length - 1]?.body ||
                      'Empty message.'}
                  </div>
                  <div>
                    {thread?.updated_at && (
                      <span className="Message-date">
                        {formatDate(thread.updated_at)}
                      </span>
                    )}
                    <br />
                    <span className="Message-count">
                      {thread.messages.length === 0 && 'No messages.'}
                      {thread.messages.length === 1 && 'One message'}
                      {thread.messages.length > 1 &&
                        `${thread.messages.length} messages`}
                    </span>
                  </div>
                </button>
              );
            })}
            <Modal
              isOpen={!!openThread}
              onRequestClose={() => setOpenThread(false)}
              contentLabel="Message thread"
            >
              <div className="Message-thread">
                <button
                  className="Message-thread-close"
                  onClick={() => setOpenThread(false)}
                >
                  ×
                </button>
                {openThread &&
                  openThread.messages.map(message => (
                    <div className="Message-thread-message" key={message.id}>
                      <div className="Message-meta">
                        <CsProfileName
                          className="Profile-reference-type"
                          id={message?.author_id}
                          names={names}
                          userId={userId}
                        />
                        {openThread?.updated_at && (
                          <span className="Message-date">
                            {formatDate(message.updated_at)}
                          </span>
                        )}
                      </div>
                      {message?.body && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: marked(message?.body),
                          }}
                        />
                      )}
                      {!message?.body && <p>Empty message.</p>}
                    </div>
                  ))}
              </div>
            </Modal>
          </>
        ) : (
          <p>No messages. :-(</p>
        )}
      </Content>
    </Section>
  );
}

export default Messages;
