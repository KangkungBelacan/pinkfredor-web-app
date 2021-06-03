import { createMuiTheme } from "@material-ui/core/styles";
const DARK_THEME = createMuiTheme({
    palette: {
        type: "dark",
        background: {
            default: "rgb(18, 18, 18)",
            paper: "rgb(18, 18, 18)"
        }
    },
    overrides: {
        MuiTableRow: {
            root: {
                "&:last-child td": {
                    borderBottom: 0,
                },
            }
        }
    }
});

export default DARK_THEME;