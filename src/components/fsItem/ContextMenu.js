import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import styles from "./Folder.module.css";
import {Box} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {useDispatch} from "react-redux";
import useStyles from "./jss.styles";
import * as Actions from "../../store/actions"


export default function ContextMenu({menuOpen, onClose, info,file,id, changeFolder, select}) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const isFile = file;
    const open = () => {
        if (isFile) {
            dispatch(Actions.openFile(id))
        } else {
            changeFolder()
        }
        onClose()
    }

    const remove = () => {
        dispatch(Actions.remove([id]))
        onClose()
    }
    const edit = () => {
        if (isFile) {
            dispatch(Actions.openFile(id));
        } else {
            dispatch(Actions.changeNewFolder({...info, open: true, editing: true}))
        }
        onClose()
    }
    return (
        <Menu
            id="fade-menu"
            anchorEl={menuOpen}
            keepMounted
            open={!!menuOpen}
            onClose={onClose}
            TransitionComponent={Fade}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            className={styles.contextMenuContainer}
            children={<Box className={styles.contextMenu}>

                <MenuItem component={"span"} onClick={() => {
                    open();
                    onClose();
                }} className={styles.contextMenuItem}>
                    Open
                </MenuItem>
                <MenuItem component={"span"} className={styles.contextMenuItem} onClick={(e) => {
                    select(e);
                    onClose();
                }}>
                    Select
                </MenuItem>
                <MenuItem component={"span"} className={styles.contextMenuItem} onClick={edit}>
                    Edit
                </MenuItem>
                <MenuItem component={"span"} className={styles.contextMenuItem} onClick={remove}>
                    Remove
                </MenuItem>
            </Box>}
        />
    )
}