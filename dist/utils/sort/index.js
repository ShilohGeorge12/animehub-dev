export const Sort = (array) => {
    const mergeSort = () => {
        if (array.length < 2)
            return;
        const middle = Math.floor(array.length / 2);
        const left = [];
        for (var i = 0; i < middle; i++)
            left[i] = array[i];
        const right = [];
        for (var i = 0; i < middle; i++)
            right[i] = array[i];
        mergeSort(left);
        mergeSort(right);
        Merge(array, left, right);
    };
    const Merge = (result, left, right) => {
        let leftIndex = 0;
        let rightIndex = 0;
        let resultIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] <= right[rightIndex]) {
                result[resultIndex++] = left[leftIndex++];
            }
            else {
                result[resultIndex++] = right[rightIndex++];
            }
        }
        while (leftIndex < left.length) {
            result[resultIndex++] = left[leftIndex++];
        }
        while (rightIndex < right.length) {
            result[resultIndex++] = right[rightIndex++];
        }
    };
    return mergeSort(array);
};
