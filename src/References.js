import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import marked from 'marked';

import './References.scss';
import { formatDate } from './utils';
import { Section, Heading, Content, CsProfileLink, Tabs } from './components';

/**
 * Count how many certain type references there are in array
 *
 * @param  {Array} references Array of references
 * @param  {String} experience "positive", "neutral" or "negative"
 * @return {Int} Total count
 */
function countReferences(references, experience) {
  if (!references || references.length === 0) {
    return 0;
  }

  return references.filter((reference) => reference.experience === experience).length;
}

function referenceTypeLabel(type, isFromMe) {
  switch (type) {
    case 'surf':
      return isFromMe ? 'To surfer' : 'From surfer';
    case 'host':
      return isFromMe ? 'To host' : 'From host';
    default:
      return isFromMe ? 'To member' : 'From member';
  }
}

function ReferencesList({list, userId}) {
  return list.map((reference) => {
    const {
      body,
      created_at,
      creator_id,
      experience,
      recipient_id,
      reference_type,
      response_body,
      response_created_at,
    } = reference;
    const isFromMe = creator_id === userId;
    const profileId = isFromMe ? recipient_id : creator_id;

    return (
      <div
        className="Profile-reference"
        key={ `${creator_id}-${recipient_id}-${created_at}` }
      >
        <p className="Profile-reference-meta">
          { reference_type && (
            <CsProfileLink className="Profile-reference-type" id={profileId}>
              { referenceTypeLabel(reference_type, isFromMe) }
            </CsProfileLink>
          ) }
          { experience && (
            <strong className={`Profile-reference-experience Profile-reference-experience-${experience}`}>
              ★ {(experience)}
            </strong>
          ) }
          { created_at && (
            <span className="Profile-reference-date">
              { formatDate(created_at) }
            </span>
          ) }
        </p>
        { body && (
          <p>
            <span dangerouslySetInnerHTML={{ __html: marked(body) }} />
          </p>
        ) }
        { response_body && (
          <div className="Profile-reference-response">
            <p>
              <strong>Response</strong>
              { response_created_at && (
                <span className="Profile-reference-date">
                  { ` ${formatDate(response_created_at)}` }
                </span>
              ) }
            </p>
            <p>
              <span dangerouslySetInnerHTML={{ __html: marked(response_body) }} />
            </p>
          </div>
        ) }
      </div>
    );
  });
}

function References({references, userId}) {
  return (
    <Router>
      <Section>
        <Heading>References</Heading>
        <Content>
          <p>
            { references?.written_references?.length
              ? (
                <>
                  <strong>{ `${references.written_references.length} written: ` }</strong>
                  { `${countReferences(references.written_references, 'positive')} positive, ` }
                  { `${countReferences(references.written_references, 'neutral')} neutral, and ` }
                  { `${countReferences(references.written_references, 'negative')} negative.` }
                </>
              )
              : `You didn't write references`
            }
          </p>
          <p>
            { references?.received_references?.length
              ? (
                <>
                  <strong>{ `${references.received_references.length} received: ` }</strong>
                  { `${countReferences(references.received_references, 'positive')} positive, ` }
                  { `${countReferences(references.received_references, 'neutral')} neutral, and ` }
                  { `${countReferences(references.received_references, 'negative')} negative.` }
                </>
              )
              : `You didn't receive references`
            }
          </p>

          <Tabs routes={ [
            { route: '/references', label: 'Received references' },
            { route: '/references/written', label: 'Written references' },
          ] } />

          <Switch>
            <Route exact path="/references">
              <h3>Received references</h3>
              <ReferencesList userId={userId} list={references?.received_references ?? []} />
            </Route>
            <Route path="/references/written">
              <h3>Written references</h3>
              <ReferencesList userId={userId} list={references?.written_references ?? []} />
            </Route>
          </Switch>
        </Content>
      </Section>
    </Router>
  );
}

export default References;
