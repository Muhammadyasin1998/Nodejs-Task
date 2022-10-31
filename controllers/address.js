const path = require("path");
const axios = require('axios');

module.exports = (req, res, next) => {
    const address = req.query.address;
    console.log(`address ${address}`);
    var addressArray = [];
    if (!Array.isArray(address)) {
        addressArray.push(address);
        console.log(addressArray);
    } else {
        addressArray = [...address];
        console.log(`addressArray ${addressArray}`);
    }

    if (addressArray.length == 1) {
        axios.get(address).then(result => {
            var title = result.data.split('<title>')[1].split('</title>')[0];
            console.log(`title ${title}`);
            return res.render(path.join(__dirname, "../", "views", "address.pug"), { address: address, title: title });
        }).catch(error => {
            console.log('Error occured in fetching request ' + error);
            return res.render(path.join(__dirname, "../", "views", "address.pug"), { address: address, title: 'Not Found' });
        });
    } else {
        const titlesArray = [];
        const promises = [];
        addressArray.forEach(element => {
            promises.push(
                axios.get(element).then(result => {
                    console.log('Fetching titles');
                    var title = result.data.split('<title>')[1].split('</title>')[0];
                    titlesArray.push([element, title]);
                    console.log(titlesArray);
                }).catch(error => {
                    console.log(error);
                    titlesArray.push([element, 'Not Found']);
                }));
        });
        console.log(`promises ${promises}`);
        console.log(`address ${address}`)

        Promise.all(promises).then(() => {
            console.log(`Response function running ${titlesArray}`);
            res.render(path.join(__dirname, "../", "views", "addressMany.pug"), { address: address, title: titlesArray });
        }).catch(error => {
            console.log(error);
        });

    }


};
