import * as Actions from "../actions"
import {createStore} from "redux";
import {findId} from "../../helpers";


const initialState = {
    current_folder: {
        name: 'main',
        id: '0',
        parent_id: null
    },
    folderToEdit: {
        open: false
    },
    newFolder: {
        open: false,
        name: ''
    },
    newFile: {
        open: false,
        name: '',
        content: '',
    },
    selected: [],

    link: "/0",
    folders: [{
        name: 'main',
        id: '0',
        destination: 'folder',
        parent_id: null
    },
        {
            name: 'folder_1',
            destination: 'folder',
            id: '1',
            parent_id: '0'
        },
        {
            name: 'folder_2',
            destination: 'folder',
            id: '2',
            parent_id: '0'
        }, {
            name: 'folder_3',
            destination: 'folder',
            id: '3',
            parent_id: '1'
        }],

    files: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.CHANGE_FOLDER: {
            state.folders.map((folder) => {
                if (folder.id === action.id) {
                    state.current_folder = folder;
                    return
                }
            })

            return {...state, selected: []}
        }
        case Actions.OPEN_FILE: {
            state.files.map((file) => {
                if (file.id === action.id) {
                    state.newFile = {...state.newFile, ...file, open: true, editing: true};
                    return
                }
            })

            return {...state}
        }
        case Actions.EDIT_FILE: {
            state.files.map((file, index) => {
                if (file.id === state.newFile.id) {
                    state.files[index] = {...state.newFile, editing: null};
                    state.newFile = {open: false, name: '', content: ''}
                }
            })

            return {...state}
        }
        case Actions.CREATE_FOLDER: {
            const newId = findId(state.folders, state.files);

            state.folders.push({
                name: state.newFolder.name,
                id: newId,
                parent_id: state.current_folder.id,
                destination: 'folder'
            });
            state.newFolder = {open: false, name: ''}

            return {...state}
        }
        case Actions.CREATE_FILE: {
            const newId = findId(state.folders, state.files);
            state.files.push({
                name: state.newFile.name,
                id: newId,
                content: state.newFile.content,
                parent_id: state.current_folder.id,
                destination: 'file'
            });
            state.newFile = {open: false, name: '', content: ''}
            return {...state}
        }

        case Actions.CHANGE_NEW_FOLDER: {
            state.newFolder = {...state.newFolder, ...action.data};

            return {...state}
        }
        case Actions.CHANGE_NEW_FILE: {
            state.newFile = {...state.newFile, ...action.data};
            return {...state}
        }

        case Actions.CHANGE_LINK: {
            action.link = action.link.replace("/", "");
            const link = action.link.split("/");
            let count = 0;
            for (let i = 0; i < link.length; i++) {
                for (let j = 0; j < state.folders.length; j++) {
                    if (link[i] === state.folders[j].id) count++;
                }
            }
            if (count === link.length) {
                state.folders.map((folder) => {
                    if (folder.id === link[link.length - 1]) {
                        state.current_folder = folder;
                    }
                })
            } else {
                state.current_folder = state.folders[0];
            }


            return {...state}
        }
        case Actions.SELECT: {
            return {...state, selected: [action.id]}
        }
        case Actions.SELECT_MULTI: {
            state.selected.push(action.id);
            return {...state}
        }
        case Actions.CLEAR_SELECTED: {
            return {...state, selected: []}
        }
        case Actions.REMOVE: {
            const removeItem = (id) => {
                let items = [];
                state.folders.map((folder) => {
                    if (folder.id === id && !folder.removed) {
                        folder.removed = true;
                    }
                    if (folder.parent_id === id) {
                        items.push(folder.id);
                        folder.removed = true;
                    }
                })
                state.files.map((file) => {
                    if (file.id === id && !file.removed) {
                        file.removed = true;
                    }
                    if (file.parent_id === id) {
                        items.push(file.id);
                        file.removed = true;
                    }
                })

                items.length &&
                items.map((item) => {
                    removeItem(item)
                })
            }
            action.id.map((item) => {
                removeItem(item);
            })
            state.selected = [];
            return {...state}
        }
        case Actions.EDIT_FOLDER: {
            state.folders.map((folder, index) => {
                if (folder.id === state.newFolder.id) {
                    state.folders[index] = {...state.newFolder, open: null}
                }
            });
            state.newFolder = {name: '', open: false}


            return {...state}
        }

        default: {
            return state;
        }
    }
}

export const store = createStore(reducer);

