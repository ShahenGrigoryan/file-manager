import React, {createRef, useState} from "react";
import styles from "../fsItem/Folder.module.css";
import * as Actions from "../../store/actions";
import DescriptionIcon from "@material-ui/icons/Description";
import {Box} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ContextMenu from "../fsItem/ContextMenu";


export default function File({info}){

    const [menuOpen, setMenuOpen] = useState(null)
    const dispatch = useDispatch();
    const fileRef = createRef();
    const selected = useSelector(state=>state.selected)
    const openContextMenu = (e) => {
        e.preventDefault();
        setMenuOpen(e.currentTarget);
    }
    const select = (event) => {
        event && event.ctrlKey ? dispatch(Actions.selectMulti(info.id)) : dispatch(Actions.select(info.id))
    }

    return(
        <>
            <ContextMenu select={select} id={info.id} file menuOpen={menuOpen} onClose={() => setMenuOpen(null)}/>
            <div
            onContextMenu={openContextMenu}
            className={selected.includes(info.id) ? `${styles.folder} ${styles.active}` : styles.folder}
            onDoubleClick={() => dispatch(Actions.openFile(info.id))}
            onClick={(event) => {
                event.ctrlKey ? dispatch(Actions.selectMulti(info.id)) : dispatch(Actions.select(info.id))
            }}
            ref={fileRef}
        >
            <DescriptionIcon className={styles.folderIcon} style={{color: '#fff'}}/>
            <Box className={styles.folderName}>
                {info.name}
            </Box>
        </div>
            </>
    )
}