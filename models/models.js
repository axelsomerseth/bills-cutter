var mainInput = {
    "people": 5,
    "bill": 350.00
};

// array of people with their bill's part
var mainResponse = {
    billSplitted: [{
        firstName: 'Axel',
        lastName: 'Cordova',
        billsSplit: 70,
        email: 'axelsomerseth@gmail.com',
        phoneNumber: '+50497447945'
    }, {
        firstName: 'Mirna',
        lastName: 'Zuniga',
        billsSplit: 70,
        email: 'mirna.zuniga@gmail.com',
        phoneNumber: '+50498656228'
    }]
};

var person = {
    id: 1,
    name: 'Axel',
    lastName: 'Cordova',
    email: 'axelsomerseth@gmail.com',
    phoneNumber: '+50497447945',
    facebookMessengerId: ''
};

encodeURI(JSON.stringify(
    {
        "people": 5,
        "bill": 350.00
    }
))
// %7B%22people%22:5,%22bill%22:350%7D