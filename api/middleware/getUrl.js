

export const getUrl = (req, res, next) => {
    try {
        const fullUrl = 'https' + '://' + req.get('host');
        req.sendUrl = fullUrl;
        next();
    } catch (error) {
        console.log(error);
    }
};

export const getFilePath = (req, res, next) => {
    const saveFilePath = req.query.filePath;
    if(!saveFilePath) return res.redirect("/");
    req.saveFilePath = saveFilePath;
    next();
}





