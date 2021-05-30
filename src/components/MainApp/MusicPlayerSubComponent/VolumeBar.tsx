import { useState } from "react";

const VolumeBar = (props:any) => {
    const [volumeDisplay, setVolumeDisplay] = useState(100);
    const setVolumeOnReleased = (evt: any) => {
        let newVolume = evt.currentTarget.value;
        if(isNaN(newVolume)) {
            return;
        }
        props.setVolume(parseInt(newVolume));
    };
    return <input type="range" min='0' max='100' defaultValue={volumeDisplay} onMouseUp={setVolumeOnReleased} onChange={(evt) => {setVolumeDisplay(parseInt(evt.target.value))}} className="player-misc-controls-volume-slider" style={{ backgroundSize: (volumeDisplay - 0) * 100 / (100 - 0) + '% 100%' }} />
};

export default VolumeBar;