import Song from './Song'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const checkCircle = <FontAwesomeIcon icon={faCheckCircle} />

interface SongsProperties {
    id: number;
    name: string;
}

function Playlist(props: any, ref: any): JSX.Element {
    const [inputValue, setInputValue] = useState('')
    const [songs, setSongs] = useState<SongsProperties[]>([]);

    function addSong() {
        setSongs([
            ...songs,
            {
                id: songs.length,
                name: inputValue
            }
        ]);
        setInputValue('')
    }

    let listItems = songs.map((song) => <Song key={song.id} index={song.id + 1} song_name={song.name}/>);

    return (
        <div>
            <div>
                <h1 className="playlist">Playlist:</h1>
                <div>
                    {listItems}
                </div>
            </div>
            <div style={{display:'inline-block'}}>
                <input value={inputValue} onChange={(event) => setInputValue(event.currentTarget.value)}/>
                <button onClick={addSong} className='player-button' style={{marginLeft:'5px'}}>{checkCircle}</button>
            </div>
        </div>
    );
}

export default Playlist;
