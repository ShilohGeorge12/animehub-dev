export const Search = (array, target) => {
    const binarySearch = (array, target, start, end) => {
        if (start >= end)
            return 'not found';
        const middle = Math.ceil((start + end) / 2);
        if (array[middle].equals(target))
            return array[middle];
        if (array[middle] > target)
            return binarySearch(array, target, start, middle - 1);
        return binarySearch(array, target, middle + 1, end);
    };
    return binarySearch(array, target, 0, array.length - 1);
};
