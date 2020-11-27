import React from "react";
import {Box, Container} from "@material-ui/core";
import styles from "../../Main.module.css";
import SideBar from "../sideBar/SideBar";
import ToolBar from "../toolBar/ToolBar";


export default function MainWrapper({children}) {
    return (
        <Container style={{display: 'flex', width: '100%'}}>
            <Box className={styles.sidebarContainer}>
                <SideBar/>
            </Box>
            <Box className={styles.mainContainer}>
                <ToolBar/>
                <Box className={styles.content}>
                    {children}
                </Box>
            </Box>
        </Container>
    )
}