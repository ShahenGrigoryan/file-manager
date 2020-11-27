
export const createLink = ({folders,current_folder}) => {
    let linkArr = [];
    const findPath = (id) => {
        if (id !== null) {
            folders.reduce((acc,folder) => {
                if (folder.id === id) {
                    linkArr.unshift(id);
                    findPath(folder.parent_id)
                }
            })
        }
    }
    findPath(current_folder.parent_id);
    linkArr.push(current_folder.id)
    return linkArr.join("/");
}

export const findId = (files, folders) => {
    const foldersArr = folders.map((folder) => folder.id);
    const filesArr = files.map((file) => file.id);
    const ids = [...foldersArr, ...filesArr];
    ids.sort((a, b) => a - b);
    const newId = +ids[ids.length - 1] + 1;
    return newId.toString();
}

export const getFolderIdByHistory = ({path,folders}) => {
    path = path.replace("/", "").split("/");
    let id = -1;
    let count = 0;
// eslint-disable-next-line array-callback-return
    path.map((id) => {
        // eslint-disable-next-line array-callback-return
        folders.map((folder) => {
            if (id === folder.id) count++;
        })
    })
    if (count === path.length) {
        // eslint-disable-next-line array-callback-return
        folders.reduce((acc,folder) => {
            if (folder.id === path[path.length - 1]) {
                id=folder.id;
            }
        })
    }
    return id;
};

