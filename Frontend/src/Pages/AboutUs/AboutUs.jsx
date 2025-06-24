import React from "react";
import "./AboutUs.css";

const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    backgroundColor: "#2D2D2D",
    justifyContent: "center",
};

const contentContainerStyle = {
    maxWidth: "50vw",
    margin: "60px",
    justifyContent: "center",
};

const titleStyle = {
    fontFamily: "Oswald, sans-serif",
    color: "#FBF1A4",
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "left",
};

const descriptionStyle = {
    fontFamily: "Montserrat, sans-serif",
    color: "#f2efdb",
    fontSize: "1rem",
    lineHeight: "1.6",
    textAlign: "left",
    maxHeight: "100vh",
};

const imageContainerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
};

const AboutUs = () => {
    return (
        <div className="content1-container">
            <div style={contentContainerStyle}>
                <h2 style={titleStyle}>About SkillSwap</h2>
                <p style={descriptionStyle}>
                    <i>
                        SkillSwap was born from a simple idea: learning shouldn’t be expensive or lonely. 
                        As students, we've often found ourselves spending large sums on certifications just
                        to learn in-demand skills. SkillSwap is our solution a space where learning happens 
                        through community-driven skill exchange.
                    </i>
                </p>
                <p style={descriptionStyle}>
                    <br />
                    We believe in the power of peer-to-peer learning. Whether you’re an expert looking to give 
                    back or a beginner ready to grow, SkillSwap connects you with people eager to teach or learn 
                    practical skills from coding and music to design and public speaking.
                    <br />
                    <br />
                    Our mission is to empower individuals to unlock their full potential through skill sharing. By facilitating
                    meaningful interactions and fostering a culture of lifelong learning, we aim to create a community where
                    everyone has the opportunity to thrive.
                </p>
            </div>
            <img src={"/assets/images/about us.png"} style={{ maxWidth: "50vw", maxHeight: "100vh" }} />
        </div>
    );
};

export default AboutUs;
