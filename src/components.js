import React from 'react'
import { NavLink } from "react-router-dom";

import './components.css';

export function Section({children}) {
  return <div className="Section">{children}</div>
}

export function Heading({children}) {
  return <div className="Section-heading">{children}</div>
}

export function Content(props) {
  return <div className="Section-content" {...props}>{props.children}</div>
}

export function CsProfileLink(props) {
  return props.id
    ? (
      <a {...props} href={`https://www.couchsurfing.com/users/${props.id}`}>
        { props.id === props.userId ? 'You' : props.children }
      </a>
    )
    : <span {...props}>{props.children}</span>
}

export function Anchor({id}) {
  return (
    <a
      className="Anchor"
      href={ `#${id}` }
      id={ id }
      title="Link here"
    >#</a>
  );
}


export function Tabs({routes}) {
  return (
    <ul className="Tabs">
      { routes.map(({ route, label, count }) => (
        <li key={route}>
          <NavLink activeClassName="is-active" to={ route }>
            { label }
            { !! count && <span className="Profile-tab-count">{ count }</span> }
          </NavLink>
        </li>
      )) }
    </ul>
  );
}
