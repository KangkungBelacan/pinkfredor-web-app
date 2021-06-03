import { createMuiTheme } from "@material-ui/core/styles";
const DARK_THEME = createMuiTheme({
    palette: {
        type: "dark"
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