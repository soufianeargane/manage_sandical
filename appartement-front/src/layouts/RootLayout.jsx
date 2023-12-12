import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import LogoutButton from "../components/shared/LogoutButton";

const drawerWidth = 220;

function ResponsiveDrawer(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const user = useSelector((state) => state.user);

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link to="/dash/appartements">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"Appartement"}
                                sx={{ color: "black" }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link to="/dash/payments">
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={"payments"}
                                sx={{ color: "black" }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                {["All mail", "Trash", "Spam"].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% )` },
                    ml: { sm: `${drawerWidth}px` },
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
            >
                <Toolbar sx={{ backgroundColor: "#eee" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        sx={{ color: "black", width: "100%" }}
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        <div className="flex justify-between w-full">
                            <div>navbar</div>
                            <div>
                                <Button
                                    id="basic-button"
                                    aria-controls={
                                        open ? "basic-menu" : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                >
                                    Dashboard
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        "aria-labelledby": "basic-button",
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        {user?.user?.name}
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        My account
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <LogoutButton />
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: "none", sm: "block" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <div style={{ marginTop: "70px", width: "100%" }}>
                <Outlet />
            </div>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default ResponsiveDrawer;
