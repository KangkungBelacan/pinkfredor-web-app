import * as HomeComponent from "./../components/Home";
import "./Home.css";

function Home() {
    return (
        <div className="home-body">
            <HomeComponent.Navbar />
            <HomeComponent.Content />
        </div>
    );
}

export default Home;
