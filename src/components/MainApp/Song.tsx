function Song(props: any) {
    return (
        <p key={props.id}>{props.index + ' | ' + props.song_name}</p>
    );
}

export default Song;
