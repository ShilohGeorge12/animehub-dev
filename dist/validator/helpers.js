export const ifError = (error) => {
    if (!error)
        return;
    console.log(error);
    const errArr = [];
    error.details.map(err => errArr.push(err.message));
    return errArr;
};
