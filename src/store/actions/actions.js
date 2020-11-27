export const CHANGE_FOLDER = "CHANGE_FOLDER"
export const CHANGE_NEW_FOLDER = "CHANGE_NEW_FOLDER"
export const CHANGE_NEW_FILE = "CHANGE_NEW_FILE"
export const SELECT = "SELECT"
export const SELECT_MULTI = "SELECT_MULTI"
export const CLEAR_SELECTED = "CLEAR_SELECTED"
export const REMOVE = "REMOVE"

export const CREATE_FOLDER = "CREATE_FOLDER"
export const CREATE_FILE = "CREATE_FILE"

export const EDIT_FILE = "EDIT_FILE"
export const EDIT_FOLDER = "EDIT_FOLDER"

export const OPEN_FILE = "OPEN_FILE"
export const CHANGE_LINK = "CHANGE_LINK"

export function changeFolder(id){
    return{
        type:CHANGE_FOLDER,
        id
    }
}
export function select(id){
    return{
        type:SELECT,
        id
    }
}
export function selectMulti(id){
    return{
        type:SELECT_MULTI,
        id
    }
}
export function clearSelected(){
    return{
        type:CLEAR_SELECTED
    }
}

export function changeLink(link){
    return{
        type:CHANGE_LINK,
        link
    }
}
export function changeNewFolder(data){
    return{
        type:CHANGE_NEW_FOLDER,
        data
    }
}
export function createFolder(name){
    return{
        type:CREATE_FOLDER,
        name
    }
}
export function createFile(data){
    return{
        type:CREATE_FILE,
        data
    }
}
export function openFile(id){
    return{
        type:OPEN_FILE,
        id
    }
}

export function changeNewFile(data){
    return{
        type:CHANGE_NEW_FILE,
        data
    }
}
export function remove(id,isSelected){
    return{
        type:REMOVE,
        id,
        isSelected
    }
}
export function editFile(){
    return{
        type:EDIT_FILE
    }
}
export function editFolder(){
    return{
        type:EDIT_FOLDER
    }
}
