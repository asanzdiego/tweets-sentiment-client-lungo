// AJAX - Get
var util_ajaxGet = function(url, data, callback) {
    console.log("GET to ", util_server_url+url);
    console.log("data=", data);
    $$.get(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Post
var util_ajaxPost = function(url, data, callback) {
    console.log("POST to ", util_server_url+url);
    console.log("data=", data);
    $$.post(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Put
var util_ajaxPut = function(url, data, callback) {
    console.log("PUT to ", util_server_url+url);
    console.log("data=", data);
    $$.put(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};

// AJAX - Delete
var util_ajaxDelete = function(url, data, callback) {
    console.log("DELETE to ", util_server_url+url);
    console.log("data=", data);
    $$.delete(util_server_url+url, data, function(json) {
        console.log("json=", json);
        callback(json);
    }, 'json');
};
