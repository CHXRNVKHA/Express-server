const fs = require('fs');

const defaultPageName = 'index.html';
const pageNotFoundMsg = 'Resource not found!';
const defaultPagesFolder = 'pages';




class PageController {
    constructor(){}
    pageNotFound (res) {
        res.statusCode = 404;
        res.end(`<h1>${pageNotFoundMsg}</h1>`);
    }
    showPage (req, res) {
        try {
            let filePath = req.url + defaultPagesFolder;
            if (filePath === '/' + defaultPagesFolder) {
                filePath = defaultPagesFolder + '/' + defaultPageName;
            }
            else {
                filePath = filePath.substr(1);
            }
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    this.pageNotFound(res);
                }
                else {
                    res.end(data);
                }
            })
        }
        catch (e) {
            res.status(400).send({error:e.message});
        }
    }
}

module.exports = PageController;