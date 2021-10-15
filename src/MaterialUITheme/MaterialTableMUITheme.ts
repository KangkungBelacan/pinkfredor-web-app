import { createTheme } from "@material-ui/core/styles";
const DARK_THEME = createTheme({
    palette: {
        type: "dark",
        background: {
            default: "rgb(18, 18, 18)",
            paper: "rgb(18, 18, 18)",
        },
        primary: {
            main: "#ff1B1B",
        },
        secondary: {
            main: "#505050",
        },
    },
    overrides: {
        MuiTableRow: {
            root: {
                "&:last-child td": {
                    borderBottom: 0,
                },
            },
        },
    },
});

export default DARK_THEME;
