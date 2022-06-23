chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {

    if (message.from == "popup") {
        let data = message.person_details;
        let fullUrl = data.url
        let sheetUrl = fullUrl.split("/")[5]
        console.log(sheetUrl)
        
        chrome.identity.getAuthToken({
            interactive: true
        }, function (token) {
            console.log(token);
            if (token == "undefined" || typeof token == "undefined") {
                console.log('error')
            } else {
                console.log(token);
                if (token) {
                    var init = {
                        method: 'GET',
                        async: true,
                        headers: {
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json'
                        },
                        'contentType': 'json'
                    };
                   
                    var sheetApi = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetUrl + "?&includeGridData=true";
                    fetch(sheetApi, init).then(function (response) {
                        console.log(response);
                        if (response.status != 200) {
                            //Sheet Error
                            console.log('if');
                            
                            chrome.runtime.sendMessage({'from':'bg','type':'googlesheet','msg':'Sheet not verified'});

                        } else {
                            //Valid Sheet
                            console.log('else');
                            chrome.runtime.sendMessage({'from':'bg','type':'googlesheet','msg':'Sheet verified'});
                        }
                    })
                }
            }
        })

    }
   

})