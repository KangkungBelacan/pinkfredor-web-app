import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface UserSettingsMenuItemProps {
    faIconClass: IconProp;
    active: boolean;
    onClick: () => any;
}
