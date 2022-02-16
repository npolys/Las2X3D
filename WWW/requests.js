///////////// Get ////////////////
function performGetRequest1(resultElement) {
    // without parameter
    resultElement.innerHTML = '';

    axios.get('http://jsonplaceholder.typicode.com/todos')
        .then(function (response) {
            resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(function (error) {
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        });
}
function performGetRequest2(resultElement, todoId) {
    // with parameter
    resultElement.innerHTML = '';

    axios.get('http://jsonplaceholder.typicode.com/todos', {
        params: {
            id: todoId
        }
    })
        .then(function (response) {
            console.log(response);
            resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(function (error) {
            resultElement.innerHTML = generateErrorHTMLOutput(error);
        });
}
///////////// Post ////////////////
function performPostRequest(resultElement, content, event) {
    //resultElement.innerHTML = '';
    axios.post('http://127.0.0.1:5000/catawba/route/shader', {
        routes: {content}
    })
        .then(function (response) {
            //resultElement.innerHTML = generateSuccessHTMLOutput(response);
            console.log('Success');//generateSuccessHTMLOutput(response));
        })
        .catch(function (error) {
            //resultElement.innerHTML = generateErrorHTMLOutput(error);
            console.log(generateErrorHTMLOutput(error));
        });

    event.preventDefault();
}
///////////// generate response html output //////////////
function generateSuccessHTMLOutput(response) {
    return  '<h4>Result</h4>' +
        '<h5>Status:</h5> ' +
        '<pre>' + response.status + ' ' + response.statusText + '</pre>' +
        '<h5>Headers:</h5>' +
        '<pre>' + JSON.stringify(response.headers, null, '\t') + '</pre>' +
        '<h5>Data:</h5>' +
        '<pre>' + JSON.stringify(response.data, null, '\t') + '</pre>';
}
function generateErrorHTMLOutput(error) {
    return  '<h4>Result</h4>' +
        '<h5>Message:</h5> ' +
        '<pre>' + error.message + '</pre>' +
        '<h5>Status:</h5> ' +
        '<pre>' + error.response.status + ' ' + error.response.statusText + '</pre>' +
        '<h5>Headers:</h5>' +
        '<pre>' + JSON.stringify(error.response.headers, null, '\t') + '</pre>' +
        '<h5>Data:</h5>' +
        '<pre>' + JSON.stringify(error.response.data, null, '\t') + '</pre>';
}