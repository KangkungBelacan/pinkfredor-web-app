import * as HelpComponent from "./../components/Help";
import "./Help.css";

function Help() {
    return (
        <div className="home-body">
            <h2>Animated Collapsibles</h2>

            <p>A Collapsible:</p>
            <HelpComponent.CollapsibleText title="Hello Benjamin" content="Use me like this" />
            <HelpComponent.CollapsibleText title="What am I?" content="I'm a collapsible textbox!" />
        </div>
    );
}
export default Help;
