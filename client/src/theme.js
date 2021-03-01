import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { brown, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: brown[300],
            main: brown[600],
            dark: brown[900],
            contrastText: '#fff',
        },
        secondary: {
            light: amber[500],
            main: amber[600],
            dark: amber[800],
            contrastText: '#000',
        },
    },
    layout: {
        nav: {
            appBarHeight: 64
        }
    }
});

export default theme;