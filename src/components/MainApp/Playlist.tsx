function Playlist(props: any): JSX.Element {

    return (
        <div>
            <div>
                <h1 className="playlist">Playlist:</h1>
                <div>
                    {props.listItems}
                </div>
            </div>
        </div>
    );
}

export default Playlist;
