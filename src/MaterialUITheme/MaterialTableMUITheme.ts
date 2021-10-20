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
        // Force table cell to have width 0 at start
        // Remove if it causes issue
        MuiTableCell: {
            head: {
                width: "0 !important",
            },
        },
    },
});

export default DARK_THEME;
