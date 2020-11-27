import {Box, Button, Grid, Tooltip} from "@material-ui/core";
import styles from "../../Main.module.css";
import * as Actions from "../../store/actions";
import {ReactComponent as BackIcon} from "../../images/back.svg";
import {ReactComponent as ParentDirIcon} from "../../images/arrow.svg";
import {ReactComponent as AddFileIcon} from "../../images/add-file.svg";
import {ReactComponent as AddFolderIcon} from "../../images/add-folder.svg";
import {ReactComponent as RemoveIcon} from "../../images/bin.svg";
import React, {useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import FileCreateDialog from "../fsItem/FileCreateDialog";
import FolderCreateDialog from "../fsItem/FolderCreateDialog";


export default function ToolBar() {
    const history = useHistory();
    const data = useSelector(state => state)
    const dispatch = useDispatch()
    const goBack = () => {
        if (history.location.pathname !== "/0") {
            history.goBack();
        }


    }
    const goParentDir = () => {
        if (history.location.pathname !== "/0") {
            let newPath = history.location.pathname;
            newPath = newPath.replace(newPath.slice(history.location.pathname.lastIndexOf("/")), '');
            dispatch(Actions.changeFolder(data.current_folder.parent_id))
            history.push(newPath);
        }
    }


    useMemo(() => {
        history.listen(() => {
            if (history.action === "POP") {
                dispatch(Actions.changeLink(history.location.pathname));
            }
        })

    }, [dispatch, history])


    return (
        <>
            <FolderCreateDialog/>
            <FileCreateDialog/>
            <Box className={styles.toolbar}>
                <Grid container>
                    <Grid item>
                        <Tooltip placement={"top"} title={"Back"}>
                            <Button onClick={goBack}>
                                <BackIcon className={styles.toolbarIcon}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip placement={"top"} title={"Go up"}>
                            <Button onClick={goParentDir}>
                                <ParentDirIcon className={styles.toolbarIcon}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip onClick={() => dispatch(Actions.changeNewFile({open: true}))} placement={"top"}
                                 title={"Create file"}>
                            <Button>
                                <AddFileIcon className={styles.toolbarIcon}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip placement={"top"} title={"Create folder"}>

                            <Button onClick={() => dispatch(Actions.changeNewFolder({open: true}))}>
                                <AddFolderIcon className={styles.toolbarIcon}/>
                            </Button>
                        </Tooltip>
                    </Grid>
                    {data.selected.length ? (<Grid item>
                        <Tooltip placement={"top"} title={"Remove"}>

                            <Button
                                onClick={() => dispatch(Actions.remove(data.selected))}
                            >
                                <RemoveIcon className={styles.toolbarIcon}/>
                            </Button>
                        </Tooltip>
                    </Grid>) : ''}

                </Grid>
            </Box>
        </>
    )
}