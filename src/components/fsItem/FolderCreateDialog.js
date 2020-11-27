import React from "react";
import {Box, Button, Dialog, Input, InputLabel} from "@material-ui/core";
import * as Actions from "../../store/actions";
import styles from "../../Main.module.css";
import {useDispatch, useSelector} from "react-redux";
import useStyles from "./jss.styles";


export default function FolderCreateDialog() {

    const data = useSelector(state=>state)
    const dispatch = useDispatch()
    const classes= useStyles();
    const saveFolder = () => {
        if(data.newFolder.name) {
            if (data.newFolder.editing) {
                dispatch(Actions.editFolder())
            } else {
                dispatch(Actions.createFolder())
            }
        }
    }
    return(
        <Dialog open={data.newFolder.open} onClose={()=>dispatch(Actions.changeNewFolder({open:false,name:'',content:''}))}>
            <Box className={styles.fileModal}>
                <InputLabel className={classes.label}>
                    Folder name
                </InputLabel>
                <Input
                    className={classes.input} value={data.newFolder.name} type={"text"} onChange={(e)=>dispatch(Actions.changeNewFolder({name:e.target.value}))}/>
                <Box className={styles.buttonContainer}>
                    <Button disabled={!data.newFolder.name} className={classes.button} variant={"contained"} onClick={saveFolder}>Save</Button>
                    <Button className={classes.button} variant={"contained"} onClick={()=>dispatch(Actions.changeNewFolder({open:false,name:''}))}>Cancel</Button>
                </Box>
            </Box>
        </Dialog>
    )
}