import React from 'react'
import marked from 'marked';

import { formatDate } from './utils';
import { Section, Heading, Content, CsProfileLink } from './components';

import './References.css';

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

function referenceTypeLabel(type) {
  switch (type) {
    case 'surf':
      return 'From Surfer';
    case 'host':
      return 'From host';
    default:
      return 'Personal';
  }
}

function References({references}) {
  return (
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

        { references?.received_references?.length && (
          references.received_references.map((reference) => (
            <div
              className="Profile-reference"
              key={ `${reference.creator_id}-${reference.recipient_id}-${reference.created_at}` }
            >
              <p className="Profile-reference-meta">
                { reference.reference_type && (
                  <CsProfileLink className="Profile-reference-type" id={reference.creator_id}>
                    { referenceTypeLabel(reference.reference_type) }
                  </CsProfileLink>
                ) }
                { reference.experience && (
                  <strong className={`Profile-reference-experience Profile-reference-experience-${reference.experience || 'unknown'}`}>
                    ★ {(reference.experience || 'unknown')}
                  </strong>
                ) }
                { reference.created_at && (
                  <span className="Profile-reference-date">
                    { formatDate(reference.created_at) }
                  </span>
                ) }
              </p>
              { reference.body && (
                <p>
                  <span dangerouslySetInnerHTML={{ __html: marked(reference.body) }} />
                </p>
              ) }
            </div>
          ))
        ) }
      </Content>
    </Section>
  );
}

export default References;
