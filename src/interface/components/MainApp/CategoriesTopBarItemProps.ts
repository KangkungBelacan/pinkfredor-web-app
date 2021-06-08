import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { GenericProps } from "../../GenericProps";

export interface CategoriesTopBarItemProps extends GenericProps {
    /**
     * Acceptable iconClass to use on FontAwesome element
     * Can be a string or an array
     * Refer https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
     */
    faIconClass?: IconProp;

    /**
     * Which page should it link to?
     * e.g. /app/organize/Album
     */
    link?:string,

    /**
     * If you prefer your own icon over Font-Awesome icons, pass me a React Component that render your icon
     */
    CustomIconElement?: () => JSX.Element;

    /**
     * Your own props
     */
    CustomIconElementProps?: {[key:string]: any};

    display_text: string;

    indexesRefetch?: any
}
