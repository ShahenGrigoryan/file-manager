import React, {useEffect} from "react";
import {Box, Grid} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import styles from "./Main.module.css";
import {useHistory} from "react-router-dom"
import Folder from "./components/folder/Folder";
import File from "./components/file/File";
import MainWrapper from "./components/mainWrapper/MainWrapper";
import {getFolderIdByHistory} from "./helpers";
import {changeFolder} from "./store/actions";


export default function FileManager() {

    const data = useSelector(state => state);
    const folders = data.folders;
    const files = data.files;
    const dispatch = useDispatch()
    const history = useHistory();
    const all = [...folders, ...files];
    useEffect(() => {
        const path = history.location.pathname;
        const folder_id = getFolderIdByHistory({path,folders})
        if (folder_id === -1) {
            history.push("/0");
            dispatch(changeFolder(0))
        } else {
            dispatch(changeFolder(folder_id));
        }
    }, [folders, dispatch, history])

    const check = (item) => {
        return (item.parent_id === data.current_folder.id && !item.removed)

    }
    let count = 0;
    return (
        <MainWrapper>
            <Grid container>
                {all.map((item) => {
                    if (check(item)) {
                        count++;
                        return (
                            <Grid item key={item.id}>
                                {item.destination === "folder" ? (
                                    <Folder key={item.id} info={item}/>
                                ) : <File key={item.id} info={item}/>}
                            </Grid>
                        )
                    }
                })}
            </Grid>
            {!count && <Box className={styles.emptyFolderText}>Folder is empty</Box>}
        </MainWrapper>
    )
}

