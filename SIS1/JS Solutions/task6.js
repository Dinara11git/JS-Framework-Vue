var join = function(arr1, arr2) {
    let result = [...arr1];

    for (let item of arr2) {
        let existing = result.find(obj => obj.id === item.id);

        if (existing) {
            Object.assign(existing, item);
        } else {
            result.push(item);
        }
    }

    return result.sort((a, b) => a.id - b.id);
};