const path = require('path');

// 404 Page Controller
module.exports = (req, res, next) => {
    return res.status(404).sendFile(path.join(__dirname, '../', 'views', '404.html'));
};