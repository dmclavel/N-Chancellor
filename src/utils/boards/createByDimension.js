export const createByDimension = (dimension) => {
    let arr = [];

    for (let i = 0; i < dimension; i++)
        arr[i] = new Array(dimension);

    return arr;
};