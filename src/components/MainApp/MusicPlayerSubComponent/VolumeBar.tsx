import { useState } from "react";

const VolumeBar = (props: any) => {
    const [volumeDisplay, setVolumeDisplay] = useState(100);
    return (
        <input
            type="range"
            min="0"
            max="100"
            defaultValue={volumeDisplay}
            onChange={(evt) => {
                props.setVolume(parseInt(evt.target.value));
                setVolumeDisplay(parseInt(evt.target.value));
            }}
            className="player-misc-controls-volume-slider"
            style={{
                backgroundSize:
                    ((volumeDisplay - 0) * 100) / (100 - 0) + "% 100%",
            }}
        />
    );
};

export default VolumeBar;
