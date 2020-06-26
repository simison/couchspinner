import React from 'react';
import { NavLink } from 'react-router-dom';

import './components.scss';

export function Section({ children }) {
  return <div className="Section">{children}</div>;
}

export function Heading({ children }) {
  return <div className="Section-heading">{children}</div>;
}

export function Content(props) {
  return (
    <div className="Section-content" {...props}>
      {props.children}
    </div>
  );
}

export function Loading({ children }) {
  return (
    <Section>
      <Heading>{children || <span className="placeholder"></span>}</Heading>
      <Content>
        <span className="placeholder"></span>
        <br />
        <span className="placeholder"></span>
        <br />
        <span className="placeholder"></span>
      </Content>
    </Section>
  );
}

export function CsProfileLink(props) {
  const label = props.children || 'Member';
  return !!props.id ? (
    <a {...props} href={`https://www.couchsurfing.com/users/${props.id}`}>
      {props.id === props.userId ? 'You' : label}
    </a>
  ) : (
    <span {...props}>{label}</span>
  );
}

export function CsProfileName(props) {
  const { id, names, alt, append } = props;
  const displayName = names ? names.get(id)?.displayName : false;

  return (
    <>
      <CsProfileLink id={id} {...props}>
        {displayName || alt}
      </CsProfileLink>
      {displayName && append}
    </>
  );
}

export function Anchor({ id }) {
  return (
    <a className="Anchor" href={`#${id}`} id={id} title="Link here">
      #
    </a>
  );
}

export function Tabs({ routes }) {
  return (
    <ul className="Tabs">
      {routes.map(({ route, label, count }) => (
        <li key={route}>
          <NavLink activeClassName="is-active" to={route}>
            {label}
            {!!count && <span className="Tab-count">{count}</span>}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
