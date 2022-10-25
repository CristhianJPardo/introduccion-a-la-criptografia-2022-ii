import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Navigator from './Navigator';
import Header from './Header';

import { InitialInfo } from './InitialInfo';

import { ShiftInfo } from './algorithms/shift/ShiftInfo';
import { ShiftAttack } from './algorithms/shift/ShiftAttack';
import { ShiftEncrypt } from './algorithms/shift/ShiftEncrypt'
import { ShiftDecrypt } from './algorithms/shift/ShiftDecrypt';

import { AffineInfo } from './algorithms/affine/AffineInfo';
import { AffineAttack } from './algorithms/affine/AffineAttack';
import { AffineEncrypt } from './algorithms/affine/AffineEncrypt'
import { AffineDecrypt } from './algorithms/affine/AffineDecrypt';

import { SubstitutionInfo } from './algorithms/substitution/SubstitutionInfo';
import { SubstitutionAttack } from './algorithms/substitution/SubstitutionAttack';
import { SubstitutionEncrypt } from './algorithms/substitution/SubstitutionEncrypt'
import { SubstitutionDecrypt } from './algorithms/substitution/SubstitutionDecrypt';

import { HillInfo } from './algorithms/hill/HillInfo';
import { HillAttack } from './algorithms/hill/HillAttack';
import { HillEncrypt } from './algorithms/hill/HillEncrypt'
import { HillDecrypt } from './algorithms/hill/HillDecrypt';

import { PermutationInfo } from './algorithms/permutation/PermutationInfo';
import { PermutationAttack } from './algorithms/permutation/PermutationAttack';
import { PermutationEncrypt } from './algorithms/permutation/PermutationEncrypt'
import { PermutationDecrypt } from './algorithms/permutation/PermutationDecrypt';

import { VigenereInfo } from './algorithms/vigenere/VigenereInfo';
import { VigenereAttack } from './algorithms/vigenere/VigenereAttack';
import { VigenereEncrypt } from './algorithms/vigenere/VigenereEncrypt'
import { VigenereDecrypt } from './algorithms/vigenere/VigenereDecrypt';
import { AESInfo } from './algorithms/aes/AESInfo';
import { AESEncrypt } from './algorithms/aes/AESEncrypt';






function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/CristhianJPardo/introduccion-a-la-criptografia-2022-ii">
                MadameX
            </Link>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}

let theme = createTheme({
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
        },
    },
    typography: {
        h5: {
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: 0.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTab: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 48,
        },
    },
});

theme = {
    ...theme,
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#081627',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
                contained: {
                    boxShadow: 'none',
                    '&:active': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    marginLeft: theme.spacing(1),
                },
                indicator: {
                    height: 3,
                    borderTopLeftRadius: 3,
                    borderTopRightRadius: 3,
                    backgroundColor: theme.palette.common.white,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    margin: '0 16px',
                    minWidth: 0,
                    padding: 0,
                    [theme.breakpoints.up('md')]: {
                        padding: 0,
                        minWidth: 0,
                    },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(1),
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    borderRadius: 4,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    backgroundColor: 'rgb(255,255,255,0.15)',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    '&.Mui-selected': {
                        color: '#4fc3f7',
                    },
                },
            },
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    fontSize: 14,
                    fontWeight: theme.typography.fontWeightMedium,
                },
            },
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: 'inherit',
                    minWidth: 'auto',
                    marginRight: theme.spacing(2),
                    '& svg': {
                        fontSize: 20,
                    },
                },
            },
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    width: 32,
                    height: 32,
                },
            },
        },
    },
};

const drawerWidth = 290;

const renderSwitch = (param1, param2, param3) => {
    switch (true) {

        // case ((param1 == null || param1 == "none")):
        //     return <InitialInfo />

        case (param1 === "Shift" && param2 === "1"):
            return <ShiftInfo />
        case (param1 === "Shift" && param2 === "2"):
            return <ShiftEncrypt
                isSmUp={param3}
            />
        case (param1 === "Shift" && param2 === "3"):
            return <ShiftDecrypt />
        case (param1 === "Shift" && param2 === "4"):
            return <ShiftAttack />

        case (param1 === "Affine" && param2 === "1"):
            return <AffineInfo />
        case (param1 === "Affine" && param2 === "2"):
            return <AffineEncrypt />
        case (param1 === "Affine" && param2 === "3"):
            return <AffineDecrypt />
        case (param1 === "Affine" && param2 === "4"):
            return <AffineAttack />

        case (param1 === "Substitution" && param2 === "1"):
            return <SubstitutionInfo />
        case (param1 === "Substitution" && param2 === "2"):
            return <SubstitutionEncrypt />
        case (param1 === "Substitution" && param2 === "3"):
            return <SubstitutionDecrypt />
        case (param1 === "Substitution" && param2 === "4"):
            return <SubstitutionAttack />

        case (param1 === "Hill" && param2 === "1"):
            return <HillInfo />
        case (param1 === "Hill" && param2 === "2"):
            return <HillEncrypt />
        case (param1 === "Hill" && param2 === "3"):
            return <HillDecrypt />
        case (param1 === "Hill" && param2 === "4"):
            return <HillAttack />

        case (param1 === "Permutation" && param2 === "1"):
            return <PermutationInfo />
        case (param1 === "Permutation" && param2 === "2"):
            return <PermutationEncrypt />
        case (param1 === "Permutation" && param2 === "3"):
            return <PermutationDecrypt />
        case (param1 === "Permutation" && param2 === "4"):
            return <PermutationAttack />

        case (param1 === "Vigenere" && param2 === "1"):
            return <VigenereInfo />
        case (param1 === "Vigenere" && param2 === "2"):
            return <VigenereEncrypt />
        case (param1 === "Vigenere" && param2 === "3"):
            return <VigenereDecrypt />
        case (param1 === "Vigenere" && param2 === "4"):
            return <VigenereAttack />

        case (param1 === "AES" && param2 === "1"):
            return <AESInfo />
        case (param1 === "AES" && param2 === "2"):
            return <AESEncrypt />
        // case (param1 === "AES" && param2 === "3"):
        //     return <VigenereDecrypt />
        // case (param1 === "AES" && param2 === "4"):
        //     return <VigenereAttack />
        default:
            return <InitialInfo />
    }
}

export default function Paperbase(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', minHeight: '100vh' }}>
                <CssBaseline />
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                >
                    {isSmUp ? null : (
                        <Navigator
                            // isSmUp={isSmUp}
                            PaperProps={{ style: { width: drawerWidth } }}
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            prop1={props.prop1}
                            prop2={props.prop2}
                            prop3={props.prop3}
                        // prop4={props.prop4}
                        />
                    )}

                    <Navigator
                        PaperProps={{ style: { width: drawerWidth } }}
                        sx={{ display: { sm: 'block', xs: 'none' } }}
                        prop1={props.prop1}
                        prop2={props.prop2}
                        prop3={props.prop3}
                        prop4={props.prop4}
                    />
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <Header
                        onDrawerToggle={handleDrawerToggle}
                        prop1={props.prop1}
                        prop2={props.prop2}
                        prop3={props.prop3}
                        prop4={props.prop4}

                    />
                    <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: '#eaeff1' }}>

                        {renderSwitch(props.prop1, props.prop3, isSmUp)}

                    </Box>
                    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                        <Copyright />
                    </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}