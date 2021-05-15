import app_img from "./../../images/Logo.png";
const Content = () => {
    return (
        <div>
            <div className="home-h1">
                <div className="home-logo">
                    <img src={app_img} alt="App_Image"></img>
                </div>
                <br />
                Pinkfredor
            </div>
            <div className="home-h2">
                Streams your private music collection from Google Drive !
            </div>
        </div>
    );
};

export default Content;
