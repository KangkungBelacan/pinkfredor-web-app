import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PlayPreviewButtonProps from "../../interface/components/generic/PlayPreviewButtonProps";
import "./PlayPreviewButton.css";
const PlayPreviewButton = (props: PlayPreviewButtonProps) => {
    return (
        <div className="play-preview-button" {...props}>
            <FontAwesomeIcon icon="play"/>
        </div>
    );
};

export default PlayPreviewButton;
