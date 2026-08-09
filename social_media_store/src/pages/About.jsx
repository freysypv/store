import "./about.css";

import React from "react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Fre Pena",
      role: "CEO & Founder",
      image:
        "https://media.istockphoto.com/id/484673402/vector/businessman.jpg?s=612x612&w=is&k=20&c=_vtaVIBY1VskjHqNPiP9Q7yxAmjHf3XC6swvsqVa-1o=",
      bio: "Fre has years of tech industry experience and leads our strategic vision.",
    },
    {
      name: "John Doe",
      role: "Head of Engineering",
      image:
        "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZSUyMGZvdG98ZW58MHx8MHx8fDA%3D",
      bio: "John handles system architecture and ensures our platform scales gracefully.",
    },
    {
      name: "Joe Dude",
      role: "Lead Designer",
      image:
        "https://media.istockphoto.com/id/450850015/photo/businessman-and-wheel-of-fortune-3d-illustration-flat-design.jpg?s=612x612&w=is&k=20&c=d2Vg1FqWP5HSoVltp3VKSzFbxOsBCdX-o8890fcWJQk=",
      bio: "Joe translates complex user needs into beautiful, accessible interfaces.",
    },
  ];

  const coreValues = [
    {
      title: "Innovation",
      desc: "We challenge standard boundaries to create better tools.",
    },
    {
      title: "Integrity",
      desc: "Transparency and trust guide every decision we make.",
    },
    {
      title: "Inclusivity",
      desc: "We build systems that serve and welcome everyone.",
    },
  ];

  return (
    <div className="about-page-wrapper">
    
      <section className="about-section">
        <h1 className="about-hero-title">Our Story</h1>
        <p className="about-hero-subtitle">
          We are a passionate group of builders, thinkers, and creators
          dedicated to solving daily product friction.
        </p>
      </section>

      <section className="about-mission-section">
        <div className="mission-column">
          <h2 className="section-title1">Our Mission</h2>
          <p className="section-text">
            Founded in 2022, our company set out to streamline digital
            communication interfaces. We recognized that teams spend too much
            time navigating disjointed tools, so we created a unified system
            that saves time and boosts production clarity.
          </p>
        </div>
        <div className="mission-column">
          <h2 className="section-title2">Why It Matters</h2>
          <p className="section-text">
            Efficiency drives creativity. When teams drop administrative
            overhead, they get to focus entirely on what they build best. Our
            tools work silently in the background, giving you absolute freedom
            to execute.
          </p>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="about-values-section">
        <h2 className="section-title-centered">What We Stand For</h2>
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
        <h2 className="section-title-centered">Meet Our Leadership</h2>
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
