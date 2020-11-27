import {Box} from "@material-ui/core";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import FolderIcon from "@material-ui/icons/Folder";
import Plus from '@material-ui/icons/Add';
import Minus from '@material-ui/icons/Remove';
import FileIcon from "@material-ui/icons/Description";
import * as Actions from "../../store/actions";
import {useHistory} from "react-router-dom"
import {createLink} from "../../helpers";


export default function SideBar() {
    const [open, setOpen] = useState([])
    const data = useSelector(state => state)
    const all = [...data.folders.filter((item) => item.parent_id === "0"),
        ...data.files.filter(item => item.parent_id === "0")];
    const children = (folder) => {
        const folders = data.folders.filter((item) => item.parent_id === folder.id);
        const files = data.files.filter((item) => item.parent_id === folder.id)
        return [...folders, ...files]
    }

    const dispatch = useDispatch();
    const history = useHistory()

    const fileSystem = (items) => {
        return (
            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                {items.map((item) => {
                    if (!item.removed) {
                        return (
                            <Box display={"flex"} key={item.id}>
                                <Box style={{cursor: "pointer"}} onClick={() => {
                                    const idIndex = open.indexOf(item.id)
                                    if (idIndex === -1) {
                                        setOpen([...open, item.id])
                                    } else {
                                        open.splice(idIndex, 1);
                                        setOpen([...open])
                                    }
                                }}>
                                    {item.destination === "folder" ? (
                                        <>
                                            {!open.includes(item.id) ? (
                                                <Plus/>
                                            ) : (
                                                <Minus/>
                                            )}
                                        </>
                                    ) : <Box width={23}/>}
                                </Box>

                                <li style={{padding: 0, margin: 0}}>
                                    <Box style={{display: 'flex', alignItems: 'center', cursor: 'default'}}
                                         onDoubleClick={() => {
                                             if (item.destination === "folder") {
                                                 dispatch(Actions.changeFolder(item.id));
                                                 history.push("/" + createLink({folders:data.folders,current_folder:data.current_folder}))
                                             }
                                         }}>
                                        {item.destination === 'folder' ? <FolderIcon style={{marginRight: 5}}/> :
                                            <FileIcon style={{marginRight: 5}}/>}
                                        {item.name}
                                    </Box>
                                    {
                                        open.find((openItem) => openItem === item.id) && children(item) && fileSystem(children(item))
                                    }

                                </li>
                            </Box>
                        )
                    }

                })
                }
            </ul>
        )
    }


    return (
        <Box padding={"25px 0"} style={{
            borderRight: '2px solid #383a45',
            height: '100vh',
            boxSizing: 'border-box'
        }}>
            {fileSystem(all)}
        </Box>
    )
}