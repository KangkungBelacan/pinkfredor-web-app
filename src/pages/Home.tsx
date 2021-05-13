import { useState } from "react";
import { HomeProps } from "./../interface/HomeProps";
function Home(props: HomeProps) {
    const [poop, setPoop] = useState(props.poop);
    return (
        <div className="">
            Hello {poop}
            <br />
            <button type="button" className="btn btn-primary">
                Primary
            </button>
        </div>
    );
}

export default Home;
