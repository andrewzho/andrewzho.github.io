import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import BucketList from "../../Assets/Projects/BucketList.png";
import NeuroFlow from "../../Assets/Projects/NeuroFlow.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={NeuroFlow}
              isBlog={false}
              title="NeuroFlow"
              description={
                <>
                  <strong>Calculate stress level based on blood flow:</strong>
                  <br />
                  Utilizes a novel, scalable means of gathering biological data Correlates that biological data to a quantitative metric for stress, derived from Heart Rate Variation (HRV).
                  <br />
                  <br />
                  Made using: React, Python, FastAPI, OpenAI, PostGresDB & Neurokit2
                </>
              }
              ghLink="https://github.com/andrewzho/NeuroFlow"
              demoLink="https://devpost.com/software/neuroflow"
            />
          </Col>

          <Col md={4} className="project-card"> 
            <ProjectCard
              imgPath={BucketList}
              isBlog={false}
              title="BucketList"
              description={
                <>
                  <strong>Flight finder based on personal preference:</strong>
                  <br />
                  Never miss out on the perfect flight for your dream trip. Build bucketlists and receive automatic notifications about the most affordable flights.
                  <br />
                  <br />
                  Made using: React, Python, FastAPI, Fetch.AI, OpenAI & MongoDB
                </>
              }
              ghLink="https://github.com/andrewzho/BucketList-AI"
              demoLink="https://devpost.com/software/bucketlist-ai"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
