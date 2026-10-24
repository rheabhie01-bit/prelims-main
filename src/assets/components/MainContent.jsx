import React from 'react';
import photo_2026 from '../photo_2026.png';

const MainContent = ({ activePage }) => {
  const name = 'Rhea Benitez';
  const age = 22;
  const course = 'Bachelor of Science in Information Technology';
  const yearLevel = '3rd Year';
  const school = 'Our Lady of the Pillar College- San Mauel, Inc.';
  const studentNo = '252-08-0400';

  let subjects = [
    'Theology 1',
    'E-Commerce',
    'Multimedia System',
    'Philippine Literature',
    'Fundamentals of Accounting',
    'Business Process Outsourcing',
    'Web Systems & Technologies 2',
    'Methods & Principles of Teaching'
  ];

  return (
    <main>
      {activePage === 'home' && (
        <>
          <section id="home" className="hero"> 
            <img src={photo_2026} alt="Hero Banner" className="hero-img" />
            <p>{`Hi, I'm ${name}. Welcome to my Profile Website!!!`}</p>
          </section>

          <section id="profile" className="section">
            <h2>Profile</h2>
            <p>Name: {name}</p>
            <p>Age: {age}</p>
            <p>Course: {course}</p>
            <p>Year Level: {yearLevel}</p>
            <p>School: {school}</p>
            <p>Student No.: {studentNo}</p>
          </section>

          <section id="subjects" className="section">
            <h2>Subjects</h2>
            <ul>
              {subjects.map((subject, index) => (
                <li key={index}>{subject}</li>
              ))}
            </ul>
          </section>

          <section id="about" className="section">
            <h2>About</h2>
            <p>
              This is a simple website I made using React to showcase a little information about myself.
              <br />
              It is also created so I can practice what I've learned so far, like components, arrays, and the map function.
            </p>
          </section>
        </>
      )}

      {activePage === 'profile' && (
        <section id="profile" className="section">
          <h2>Profile</h2>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
          <p>Course: {course}</p>
          <p>Year Level: {yearLevel}</p>
          <p>School: {school}</p>
          <p>Student No.: {studentNo}</p>
        </section>
      )}

      {activePage === 'subjects' && (
        <section id="subjects" className="section">
          <h2>Subjects</h2>
          <ul>
            {subjects.map((subject, index) => (
              <li key={index}>{subject}</li>
            ))}
          </ul>
        </section>
      )}

      {activePage === 'about' && (
        <section id="about" className="section">
          <h2>About</h2>
          <p>
            This is a simple website I made using React to showcase a little information about myself.
            <br />
            It is also created so I can practice what I've learned so far, like components, arrays, and the map function.
          </p>
        </section>
      )}
    </main>
  );
};

export default MainContent; 