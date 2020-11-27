import React from "react";
import {Box, Button, Dialog, Input, InputLabel} from "@material-ui/core";
import * as Actions from "../../store/actions";
import styles from "../../Main.module.css";
import {useDispatch, useSelector} from "react-redux";
import useStyles from "./jss.styles";


export default function FileCreateDialog() {

    const data = useSelector(state => state)
    const dispatch = useDispatch()
    const classes = useStyles();
    const saveFile = () => {
        if (data.newFile.name) {
            if (data.newFile.editing) {
                dispatch(Actions.editFile())
            } else {
                dispatch(Actions.createFile())
            }
        }
    }
    return (
        <Dialog open={data.newFile.open}
                onClose={() => dispatch(Actions.changeNewFile({open: false, name: '', content: ''}))}>
            <Box className={styles.fileModal}>
                <InputLabel className={classes.label}>
                    File name
                </InputLabel>
                <Input
                    className={classes.input} value={data.newFile.name} type={"text"}
                    onChange={(e) => dispatch(Actions.changeNewFile({name: e.target.value}))}/>
                <textarea className={styles.fileContent} value={data.newFile.content}
                          onChange={(e) => dispatch(Actions.changeNewFile({content: e.target.value}))}/>
                <Box className={styles.buttonContainer}>
                    <Button disabled={!data.newFile.name} className={classes.button} variant={"contained"}
                            onClick={saveFile}>Save</Button>
                    <Button className={classes.button} variant={"contained"}
                            onClick={() => dispatch(Actions.changeNewFile({open: false, name: ''}))}>Cancel</Button>
                </Box>
            </Box>
        </Dialog>
    )
}