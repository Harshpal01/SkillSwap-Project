import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Nav from "react-bootstrap/Nav";
import Spinner from "react-bootstrap/Spinner";
import ProfileCard from "./ProfileCard";
import "./Discover.css";
import Search from "./Search";

const Discover = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const [loading, setLoading] = useState(false);
    const [discoverUsers, setDiscoverUsers] = useState([]);
    const [webDevUsers, setWebDevUsers] = useState([]);
    const [mlUsers, setMlUsers] = useState([]);
    const [otherUsers, setOtherUsers] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/user/registered/getDetails`);
                setUser(data.data);
                localStorage.setItem("userInfo", JSON.stringify(data.data));
            } catch (error) {
                if (error?.response?.data?.message) {
                    toast.error(error.response.data.message);
                }
                localStorage.removeItem("userInfo");
                setUser(null);
                await axios.get("/auth/logout");
                navigate("/login");
            }
        };

        const getDiscoverUsers = async () => {
            try {
                const { data } = await axios.get("/user/discover");
                setDiscoverUsers(data.data.forYou);
                setWebDevUsers(data.data.webDev);
                setMlUsers(data.data.ml);
                setOtherUsers(data.data.others);
            } catch (error) {
                if (error?.response?.data?.message) {
                    toast.error(error.response.data.message);
                }
                localStorage.removeItem("userInfo");
                setUser(null);
                await axios.get("/auth/logout");
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };

        getUser();
        getDiscoverUsers();
    }, []);

    return (
        <div className="discover-page">
            <div className="content-container">
                <div className="nav-bar">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="#for-you" className="navlink" id="foryou">
                            For You
                        </Nav.Link>
                        <Nav.Link href="#popular" className="navlink" id="popular1">
                            Popular
                        </Nav.Link>
                        <Nav.Link href="#web-development" className="navlink">
                            Web Development
                        </Nav.Link>
                        <Nav.Link href="#machine-learning" className="navlink">
                            Machine Learning
                        </Nav.Link>
                        <Nav.Link href="#graphic-design" className="navlink">
                            Graphic Design
                        </Nav.Link>
                        <Nav.Link href="#soft-skills" className="navlink">
                            Soft Skills
                        </Nav.Link>
                        <Nav.Link href="#others" className="navlink">
                            Others
                        </Nav.Link>
                    </Nav>
                </div>

                <div className="heading-container">
                    {loading ? (
                        <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <>
                            <div>
                                <Search />
                            </div>

                            <h1 id="for-you" style={{ fontFamily: "Josefin Sans, sans-serif", color: "#fbf1a4", marginTop: "2rem", marginBottom: "1rem" }}>
                                For You
                            </h1>
                            <div className="profile-cards">
                                {discoverUsers.length > 0 ? (
                                    discoverUsers.map((user) => (
                                        <ProfileCard
                                            key={user?.username}
                                            profileImageUrl={user?.picture}
                                            name={user?.name}
                                            rating={user?.rating || 5}
                                            bio={user?.bio}
                                            skills={user?.skillsProficientAt}
                                            username={user?.username}
                                        />
                                    ))
                                ) : (
                                    <h1 style={{ color: "#fbf1a4" }}>No users to show</h1>
                                )}
                            </div>

                            <h1 id="popular" style={{ fontFamily: "Josefin Sans, sans-serif", color: "#fbf1a4", marginTop: "1rem", marginBottom: "3rem" }}>
                                Popular
                            </h1>

                            <h2 id="web-development">Web Development</h2>
                            <div className="profile-cards">
                                {webDevUsers.length > 0 ? (
                                    webDevUsers.map((user) => (
                                        <ProfileCard
                                            key={user?.username}
                                            profileImageUrl={user?.picture}
                                            name={user?.name}
                                            rating={4}
                                            bio={user?.bio}
                                            skills={user?.skillsProficientAt}
                                            username={user?.username}
                                        />
                                    ))
                                ) : (
                                    <h1 style={{ color: "#fbf1a4" }}>No users to show</h1>
                                )}
                            </div>

                            <h2 id="machine-learning">Machine Learning</h2>
                            <div className="profile-cards">
                                {mlUsers.length > 0 ? (
                                    mlUsers.map((user) => (
                                        <ProfileCard
                                            key={user?.username}
                                            profileImageUrl={user?.picture}
                                            name={user?.name}
                                            rating={4}
                                            bio={user?.bio}
                                            skills={user?.skillsProficientAt}
                                            username={user?.username}
                                        />
                                    ))
                                ) : (
                                    <h1 style={{ color: "#fbf1a4" }}>No users to show</h1>
                                )}
                            </div>

                            <h2 id="graphic-design">Graphic Design</h2>
                            <div className="profile-cards">
                                <ProfileCard
                                    profileImageUrl="profile-image-url"
                                    name="Graphic Designer One"
                                    rating={5}
                                    bio="Experienced in UI/UX and visual design."
                                    skills={["Figma", "Adobe XD", "Photoshop"]}
                                />
                                <ProfileCard
                                    profileImageUrl="profile-image-url"
                                    name="Graphic Designer Two"
                                    rating={5}
                                    bio="Freelance designer with a focus on branding."
                                    skills={["Illustrator", "Logo Design", "Canva"]}
                                />
                            </div>

                            <h2 id="soft-skills">Soft Skills</h2>
                            <div className="profile-cards">
                                <ProfileCard
                                    profileImageUrl="profile-image-url"
                                    name="Coach One"
                                    rating={5}
                                    bio="Soft skills coach with 10+ years of experience."
                                    skills={["Public Speaking", "Leadership", "Empathy"]}
                                />
                                <ProfileCard
                                    profileImageUrl="profile-image-url"
                                    name="Mentor Two"
                                    rating={5}
                                    bio="Mentor helping students grow their communication skills."
                                    skills={["Teamwork", "Conflict Resolution", "Critical Thinking"]}
                                />
                            </div>

                            <h2 id="others">Others</h2>
                            <div className="profile-cards">
                                {otherUsers.length > 0 ? (
                                    otherUsers.map((user) => (
                                        <ProfileCard
                                            key={user?.username}
                                            profileImageUrl={user?.picture}
                                            name={user?.name}
                                            rating={4}
                                            bio={user?.bio}
                                            skills={user?.skillsProficientAt}
                                            username={user?.username}
                                        />
                                    ))
                                ) : (
                                    <h1 style={{ color: "#fbf1a4" }}>No users to show</h1>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discover;
