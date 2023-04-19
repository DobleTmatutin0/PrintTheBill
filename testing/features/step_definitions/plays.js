const assert = require('assert');
const { Given, When, Then } = require('cucumber');
const jd = require('json-diff');
const request = require('sync-request');

Given('que existen la obra {string}', function (string) {
    // Write code here that turns the phrase above into concrete actions
    return true;
});

When(
    'solicitamos recuperar la lista de obras',
    function () {
        // Write code here that turns the phrase above into concrete actions
        let res = request(
            'GET',
            'http://backend:8080/plays'
        );

        this.response = JSON.parse(res.body, 'utf8');
        
        return (res.statusCode == 200);
    }
);

Then('esperamos recibir estado {int}', function (status) {
    return (this.response.status == status);
});

Then('el mensaje de respuesta {string}', function (message) {
    // Write code here that turns the phrase above into concrete actions
    return (this.response.message == message);
});

Then('los siguientes datos:', function (docString) {
    // Write code here that turns the phrase above into concrete actions
    let obras = JSON.parse(docString);
    
    for (let o of this.response.data) {
        delete o.id;
    }

    obras = obras.sort((a, b) => a.code.localeCompare(b.code));
    this.response.data = this.response.data.sort((a, b) => a.code.localeCompare(b.code));

    // console.log(JSON.stringify(obras,null, 3));
    // console.log(JSON.stringify(this.response,null, 3));

    let d = jd.diff(
        obras,
        this.response.data);

    // console.log(d);

    return assert.equal(d, null);
});