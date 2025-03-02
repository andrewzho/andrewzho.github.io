import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I'm <b className="purple">Andrew Ho</b> and currently a senior at <b className="purple">UC Irvine</b> studying Computer Science with a specialization in <b className="purple">Inteligent Systems</b>.
            <br />
            <br />
            I'm very passionate about leveraging technology to solve real-world problems, with a strong focus on <b className="purple">Fullstack Development and Data Analysis</b>.
            <br />
            <br />
            I'm currently employedd as a Software Enginner at <b className="purple">New York Proton Center</b> and <b className="purple">Convo</b>
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Video Games!
            </li>
            <li className="about-activity">
              <ImPointRight /> Going to the gym!
            </li>
            <li className="about-activity">
              <ImPointRight /> Playing volleyball!
            </li>
          </ul>
          <p className="purple">
            "Build technologies that make the world a better place!"{" "}
          </p>
          <footer className="blockquote-footer">Andrew Z. Ho</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;