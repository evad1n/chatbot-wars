import React from 'react';
import Router from 'router/Router';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'scripts/theme';
import { ProvideAuth } from "scripts/auth";


export default function App() {
    return (
        <ProvideAuth>
            <ThemeProvider theme={theme}>
                <Router />
            </ThemeProvider>
        </ProvideAuth>

    );
}

// function Navbar(props) {
//     // Get auth state and re-render anytime it changes
//     const auth = useAuth();

//     return (
//         <NavbarContainer>
//             <Logo />
//             <Menu>
//                 <Link to="/about">About</Link>
//                 <Link to="/contact">Contact</Link>
//                 {auth.user ? (
//                     <Fragment>
//                         <Link to="/account">Account ({auth.user.email})</Link>
//                         <Button onClick={() => auth.signout()}>Signout</Button>
//                     </Fragment>
//                 ) : (
//                     <Link to="/signin">Signin</Link>
//                 )}
//             </Menu>
//         </NavbarContainer>
//     );
// }