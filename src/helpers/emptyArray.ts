const emptyArray = (arr: Array<any>): Boolean => {
    if (Array.isArray(arr) && arr.length > 0) {
        return false;
    }

    return true;
}

export default emptyArray;