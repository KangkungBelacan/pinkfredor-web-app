import { createMuiTheme } from "@material-ui/core/styles";
const DARK_THEME = createMuiTheme({
    palette: {
        text: {
            primary: "#ffffff",
            secondary: "#ffffff",
            disabled: "#5f5f5f",
            hint: "#2a2a2a",
        },
        background: {
            paper: "rgb(51, 51, 51)",
            default: "rgb(51, 51, 51)",
        }
    },
});

export default DARK_THEME;