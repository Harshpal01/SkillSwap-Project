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
                handleLogout(error);
            }
        };

        const getDiscoverUsers = async () => {
            try {
                const { data } = await axios.get("/user/discover");
                setDiscoverUsers(data.data.forYou || []);
                setWebDevUsers(data.data.webDev || []);
                setMlUsers(data.data.ml || []);
                setOtherUsers(data.data.others || []);
            } catch (error) {
                handleLogout(error);
            } finally {
                setLoading(false);
            }
        };

        const handleLogout = async (error) => {
            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            }
            localStorage.removeItem("userInfo");
            setUser(null);
            await axios.get("/auth/logout");
            navigate("/login");
        };

        getUser();
        getDiscoverUsers();
    }, []);

    const renderUserSection = (title, id, users) => (
        <>
            <h2 id={id} className="section-title">{title}</h2>
            <div className="profile-cards">
                {users.length > 0 ? (
                    users.map((user) => (
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
                    <h4 style={{ color: "#fbf1a4" }}>No users to show</h4>
                )}
            </div>
        </>
    );

    return (
        <div className="discover-page">
            <div className="content-container">
                <div className="nav-bar">
                    <Nav defaultActiveKey="/home" className="flex-column">
                        <Nav.Link href="#for-you" className="navlink">For You</Nav.Link>
                        <Nav.Link href="#popular" className="navlink">Popular</Nav.Link>
                        <Nav.Link href="#web-development" className="navlink">Web Development</Nav.Link>
                        <Nav.Link href="#machine-learning" className="navlink">Machine Learning</Nav.Link>
                        <Nav.Link href="#graphic-design" className="navlink">Graphic Design</Nav.Link>
                        <Nav.Link href="#soft-skills" className="navlink">Soft Skills</Nav.Link>
                        <Nav.Link href="#others" className="navlink">Others</Nav.Link>
                    </Nav>
                </div>

                <div className="heading-container">
                    {loading ? (
                        <div className="container d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : (
                        <>
                            <Search />

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
                                    <h4 style={{ color: "#fbf1a4" }}>No users to show</h4>
                                )}
                            </div>

                            <h1 id="popular" style={{ fontFamily: "Josefin Sans, sans-serif", color: "#fbf1a4", marginTop: "2rem", marginBottom: "1rem" }}>
                                Popular
                            </h1>

                            {renderUserSection("Web Development", "web-development", webDevUsers)}
                            {renderUserSection("Machine Learning", "machine-learning", mlUsers)}

                            <h2 id="graphic-design" className="section-title">Graphic Design</h2>
                            <div className="profile-cards">
                                <ProfileCard
                                    profileImageUrl="/assets/images/profile.jpg"
                                    name="Graphic Designer One"
                                    rating={5}
                                    bio="Experienced in UI/UX and visual design."
                                    skills={["Figma", "Adobe XD", "Photoshop"]}
                                />
                                <ProfileCard
                                    profileImageUrl="/assets/images/profile3.jpg"
                                    name="Graphic Designer Two"
                                    rating={5}
                                    bio="Freelance designer with a focus on branding."
                                    skills={["Illustrator", "Logo Design", "Canva"]}
                                />
                            </div>

                            <h2 id="soft-skills" className="section-title">Soft Skills</h2>
                            <div className="profile-cards">
                                <ProfileCard
                                    profileImageUrl="/assets/images/profile4.jpg"
                                    name="Coach One"
                                    rating={5}
                                    bio="Soft skills coach with 10+ years of experience."
                                    skills={["Public Speaking", "Leadership", "Empathy"]}
                                />
                                <ProfileCard
                                    profileImageUrl="/assets/images/profile5.jpg"
                                    name="Mentor Two"
                                    rating={5}
                                    bio="Mentor helping students grow their communication skills."
                                    skills={["Teamwork", "Conflict Resolution", "Critical Thinking"]}
                                />
                            </div>

                            {renderUserSection("Others", "others", otherUsers)}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Discover;
