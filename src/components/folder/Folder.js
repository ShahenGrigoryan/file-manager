import {Box} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import React, {createRef, useEffect, useState} from "react";
import styles from "../fsItem/Folder.module.css"
import {useDispatch, useSelector} from "react-redux";
import * as Actions from "../../store/actions"
import {useHistory} from "react-router-dom"
import ContextMenu from "../fsItem/ContextMenu"
import {createLink} from "../../helpers";


export default function Folder({info}) {
    const history = useHistory();
    const folderRef = createRef();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(null)

    const data = useSelector(state => state);
    const handleClose = () => {
        setMenuOpen(null);
    };
    const openContextMenu = (e) => {
        e.preventDefault();
        setMenuOpen(e.currentTarget);
    }


    const changeFolder = () => {
        dispatch(Actions.changeFolder(info.id));
        history.push("/" + createLink({folders: data.folders, current_folder: data.current_folder}))
    }
    const clearSelected = (event) => {
        if (folderRef.current && !folderRef.current.contains(event.target)) {
            dispatch(Actions.clearSelected())
        }
    }

    const select = (event) => {
        event && event.ctrlKey ? dispatch(Actions.selectMulti(info.id)) : dispatch(Actions.select(info.id))
    }

    useEffect(() => {
        document.addEventListener('click', clearSelected)
        return () => {
            document.removeEventListener('click', clearSelected)
        }
    }, [clearSelected, folderRef])


    return (
        <>
            <ContextMenu changeFolder={changeFolder} select={select} id={info.id} menuOpen={menuOpen}
                         onClose={handleClose}/>
            <div
                onContextMenu={openContextMenu}
                className={data.selected.includes(info.id) ? `${styles.folder} ${styles.active}` : styles.folder}
                onDoubleClick={changeFolder}
                onClick={select}
                ref={folderRef}
            >
                <FolderIcon className={styles.folderIcon}/>
                <Box className={styles.folderName}>
                    {info.name}
                </Box>
            </div>
        </>
    )
}