import "./../../pages/Home.css";
const CollapsibleText = (props: any) => {

    function collapsible(event: any) {
        event.currentTarget.classList.toggle("active");
        var content = event.currentTarget.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } 
        else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
    }

    return (
        <div>
            <button onClick={collapsible} className="collapsible">{props.title}</button>
            <div className="content">
                <p>{props.content}</p>
            </div>
        </div>
    );
};

export default CollapsibleText;
