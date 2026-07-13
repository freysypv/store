import './about.css';

import React from 'react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Fre P',
      role: 'CEO & Founder',
      image: 'https://placeholder.com',
      bio: 'Jane has 10+ years of tech industry experience and leads our strategic vision.',
    },
    {
      name: 'John Doe',
      role: 'Head of Engineering',
      image: 'https://placeholder.com',
      bio: 'John handles system architecture and ensures our platform scales gracefully.',
    },
    {
      name: 'Joe Doe',
      role: 'Lead Designer',
      image: 'https://placeholder.com',
      bio: 'Alex translates complex user needs into beautiful, accessible interfaces.',
    },
  ];

  const coreValues = [
    { title: 'Innovation', desc: 'We challenge standard boundaries to create better tools.' },
    { title: 'Integrity', desc: 'Transparency and trust guide every decision we make.' },
    { title: 'Inclusivity', desc: 'We build systems that serve and welcome everyone.' },
  ];

  return (
    <div className="about-page-wrapper">
      
      {/* 1. Hero Section */}
      <section className="about-hero">
        <h1 className="about-hero-title">Our Story</h1>
        <p className="about-hero-subtitle">
          We are a passionate group of builders, thinkers, and creators dedicated to solving daily product friction.
        </p>
      </section>

      {/* 2. Mission Split Section */}
      <section className="about-mission-section">
        <div className="mission-column">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            Founded in 2022, our company set out to streamline digital communication interfaces. 
            We recognized that teams spend too much time navigating disjointed tools, so we created a 
            unified system that saves time and boosts production clarity.
          </p>
        </div>
        <div className="mission-column">
          <h2 className="section-title">Why It Matters</h2>
          <p className="section-text">
            Efficiency drives creativity. When teams drop administrative overhead, they get to focus entirely on 
            what they build best. Our tools work silently in the background, giving you absolute freedom to execute.
          </p>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="about-values-section">
        <h2 className="section-title centered">What We Stand For</h2>
        <div className="values-grid">
          {coreValues.map((value, idx) => (
            <div key={idx} className="value-card">
              <h3 className="value-card-title">{value.title}</h3>
              <p className="value-card-text">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="about-team-section">
        <h2 className="section-title centered">Meet Our Leadership</h2>
        <div className="team-grid">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="team-member-card">
              <img 
                src={member.image} 
                alt={member.name} 
                className="team-member-img"
              />
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <p className="team-member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutUs;

