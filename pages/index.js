/** @flow */

import Head from 'next/head'
import React from 'react'
import { Elastic, Expo, TimelineLight, TweenMax } from 'gsap'
import Favicon from 'react-favicon'

/** Icon */

type IconPropsT = {
  title: string,
  url: string,
}

const Icon = ({ title, url }: IconPropsT) =>
  <div className="icon">
    <img src={url} title={title} />
    <style jsx>{`
      .icon {
        display: flex;
        flex: 0 auto;
      }
      img {
        border-radius: 50%;
        width: 400px;
        height: 400px;
      }
    `}</style>
  </div>

/** Bio */

const Bio = ({ children }) =>
  <div className="bio">
    {children}
    <style jsx>{`
      display: flex;
      flex: 0 auto;
      flex-direction: column;
      box-sizing: border-box;
      width: 400px;
      padding: 4rem 0rem 0rem 0rem;
      @media screen and (max-height: 850px) {
        .bio {
          padding: 0rem 0rem 0rem 4rem;
        }
      }
    `}</style>
  </div>

/** Title */

type TitlePropsT = {
  text: string,
}

const Title = ({ text }: TitlePropsT) =>
  <h1 className="title">
    {text}
    <style jsx>{`
      font-family: 'Alegreya Sans SC';
      font-weight: 200;
      font-weight: 400;
      margin: 0;
    `}</style>
  </h1>

/** Subtitle */

type SubtitlePropsT = {
  children: React$Children,
}

const Subtitle = ({ children }: SubtitlePropsT) =>
  <h2 className="subtitle">
    {children}
    <style jsx>{`
      margin: 0 0 1rem 0;
      font-family: 'Alegreya Sans SC';
      font-size: 1.35rem;
      font-weight: 200;
    `}</style>
  </h2>

/** Paragraph */

type ParagraphPropsT = {
  children: React$Children,
}

const Paragraph = ({ children }: ParagraphPropsT) =>
  <p className="paragraph">
    {children}
  </p>

/** Animation timeline */

const createTimeline = () => {
  const timeline = new TimelineLite()

  // First, bounce in the icon
  timeline.add(
    TweenMax.fromTo(
      ['.icon'],
      1.2,
      {
        css: {
          opacity: 1.0,
          scale: 0.7,
        },
      },
      {
        ease: Elastic.easeOut,
        css: {
          opacity: 1.0,
          scale: 1.0,
        },
      }
    )
  )

  // Then, fade in the rest of the page
  timeline.add(
    TweenMax.staggerFromTo(
      ['.title', '.subtitle', '.paragraph'],
      0.5,
      {
        css: {
          opacity: 0.0,
        },
      },
      {
        ease: Expo.easeInOut,
        css: {
          opacity: 1.0,
        },
      },
      0.1
    ),
    0.3
  )

  return timeline
}

/** Profile */

type ProfilePropsT = {
  children: React$Children,
}

class Profile extends React.Component {
  props: ProfilePropsT

  componentDidMount() {
    createTimeline().resume()
  }

  render() {
    const { children } = this.props
    return (
      <div className="profile">
        <style jsx>{`
          display: flex;
          flex: 1 auto;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem;
          font-family: 'Raleway';
          font-weight: 100;
          box-sizing: border-box;
          color: #eee;
          width: 100%;
          margin: auto;
          @media screen and (max-height: 850px) {
            .profile {
              flex-direction: row;
            }
          }
        `}</style>
        {children}
      </div>
    )
  }
}

/** Page */

export default () =>
  <div>
    <Favicon
      url={[
        'https://pbs.twimg.com/profile_images/747365723203321856/P9gO00pv_400x400.jpg',
      ]}
    />
    <Head>
      <title>Jannis Pohlmann</title>
      <link
        href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC:200,300,400"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:200,300,400"
        rel="stylesheet"
      />
      <style global>{`
        body { background-color: #272324; /* #2e292a; */ }

        em {
          font-style: normal;
          border-bottom: thin solid white;
        }

        a, a:link, a:visited {
          color: inherit;
          text-decoration: none;
          border-bottom: thin solid white;
        }

        p a {
          display: inline-block;
          margin-right: 1rem;
        }

        .icon, .title, .subtitle, .paragraph { opacity: 0; }
      `}</style>
    </Head>
    <Profile>
      <Icon url="https://pbs.twimg.com/profile_images/747365723203321856/P9gO00pv_400x400.jpg" />
      <Bio>
        <Title text="Jannis Pohlmann" />
        <Subtitle>
          <div>Tech Lead &amp; Co-Founder at <a href="https://thegraph.com">The Graph</a>.</div>
          <div>Musician at <a href="https://soundcloud.com/maenadband">MÆNAD</a>.</div>
        </Subtitle>
        <Paragraph>
          I have been called many things. I think <em>beast</em> is my favorite.
        </Paragraph>
        <Paragraph>
          <a href="mailto:contact@jannispohlmann.de">@</a>
          <a href="https://twitter.com/jannispohlmann">Twitter</a>
          <a href="https://linkedin.com/in/jannispohlmann">LinkedIn</a>
        </Paragraph>
      </Bio>
    </Profile>
  </div>
