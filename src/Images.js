import React from 'react'

import { Content, Section, Heading } from './components';
import './Images.css';

function Images({images}) {
  return (
    <Section>
      <Heading>Images</Heading>
      <Content>
        {
          images.length
          ? (
            images.map(({id, blobUrl}) => (
              <p key={id}>
                <a href={blobUrl} download={id}>
                  <img src={blobUrl} alt="" className="Image" />
                </a>
              </p>
            ))
          )
          : <p>You had no images... :-(</p>
        }
      </Content>
    </Section>
  );
}

export default Images;
