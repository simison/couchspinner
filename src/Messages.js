import React, { useState } from 'react';
import marked from 'marked';

import './Messages.scss';
import { formatDate } from './utils';
import { Section, Heading, Content, CsProfileName } from './components';

function Messages({ messages, userId, names }) {
  const [openThread, setOpenThread] = useState(false);

  return (
    <Section>
      <Heading>Messages</Heading>
      <Content>
        {messages.length
          ? messages.map(thread => {
              console.log(thread);
              // Other profile IDs than your own
              const profileIds = thread.user_ids_concatenated
                .split(',')
                .filter(id => id !== userId);

              // Unique ID for message thread
              const threadId = `${thread?.user_ids_concatenated}-${thread?.created_at}`;

              const hasMessages = !!thread.messages.length;
              const isThreadOpen = openThread === threadId;
              const latestMessage = thread.messages.pop()?.body;

              return (
                <div className="Message" key={threadId}>
                  <div className="Message-meta">
                    {profileIds.map(profileId => (
                      <CsProfileName
                        className="Profile-reference-type"
                        names={names}
                        id={profileId}
                        key={profileId}
                      />
                    ))}
                    {thread?.updated_at && (
                      <span className="Message-date">
                        {formatDate(thread.updated_at)}
                      </span>
                    )}
                  </div>
                  {hasMessages && isThreadOpen && (
                    <div
                      className="Message-thread"
                      dangerouslySetInnerHTML={{
                        __html: marked(latestMessage),
                      }}
                    />
                  )}
                  {hasMessages && !isThreadOpen && (
                    <>
                      {latestMessage && (
                        <div
                          className="Message-preview"
                          dangerouslySetInnerHTML={{
                            __html: marked(latestMessage),
                          }}
                        />
                      )}
                      <button
                        className="Message-read"
                        onClick={setOpenThread(threadId)}
                      >
                        Read all
                      </button>
                    </>
                  )}

                  {!hasMessages && (
                    <p className="Message-thread">Empty message.</p>
                  )}
                </div>
              );
            })
          : 'No messages. :-('}
      </Content>
    </Section>
  );
}

export default Messages;
