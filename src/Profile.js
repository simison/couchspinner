import React from 'react'
import marked from 'marked';

import './Profile.css';

function Section({children}) {
  return <div className="Profile-section">{children}</div>
}

function Heading({children}) {
  return <div className="Profile-section-heading">{children}</div>
}

function Content(props) {
  return <div className="Profile-section-content" {...props}>{props.children}</div>
}

function Profile({profile, images}) {
  const { user_data: user, interests } = profile;

  console.log(' interests:',interests);

  return (
    <>
      <div className="Profile">
        <p>Your Couchsurfing.com profile</p>

        <h1>
        { user?.profile?.first_name && `${user.profile.first_name} ` }
        { user?.profile?.last_name && `${user.profile.last_name} ` }
        { user?.username && `(${user.username})` }
        </h1>

        <Section>
          <Heading>About me</Heading>
          <Content>
          { user?.profile?.about_me && (
            <span dangerouslySetInnerHTML={{ __html: marked(user.profile.about_me) }} />
          ) }
          { user?.profile?.interests && (
            <>
              <p><strong>More about my interests</strong></p>
              <span dangerouslySetInnerHTML={{ __html: marked(user.profile.interests) }} />
              { interests?.interests && (
                <ul>
                { interests.interests.forEach(interest => (
                  <li key={interest.name}>{interest.name}</li>
                )) }
                </ul>
              ) }
            </>
          ) }
          { user?.profile?.media && (
            <>
              <p><strong>My Favorite Music, Movies & Books</strong></p>
              <span dangerouslySetInnerHTML={{ __html: marked(user.profile.media) }} />
            </>
          ) }
          { user?.profile?.teach && (
            <>
              <p><strong>Teach, Learn, Share</strong></p>
              <span dangerouslySetInnerHTML={{ __html: marked(user.profile.teach) }} />
            </>
          ) }
          { user?.profile?.amazing_thing && (
            <>
              <p><strong>One Amazing Thing I've Done</strong></p>
              <span dangerouslySetInnerHTML={{ __html: marked(user.profile.amazing_thing) }} />
            </>
          ) }
          { user?.profile?.surf_reason && (
            <>
              <p><strong>Why I'm on Couchsurfing</strong></p>
              <span dangerouslySetInnerHTML={{ __html: marked(user.profile.surf_reason) }} />
            </>
          ) }
          { user?.profile?.offer_hosts && (
            <>
              <p><strong>What I Can Share With Hosts</strong></p>
              <span dangerouslySetInnerHTML={{ __html: marked(user.profile.offer_hosts) }} />
            </>
          ) }
          </Content>
        </Section>
      </div>
    </>
  );
}

export default Profile;
