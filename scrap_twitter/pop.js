window.onload = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log(tabs)
        var activeTab = tabs[0];
        if (activeTab.url.indexOf("twitter.com") != -1) {
            chrome.tabs.sendMessage(activeTab.id, {"action":"check"});
        } else {
            window.open("https://www.twitter.com");
        }
    });
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
    if(message.type == "sendDetails"){
        
        let name = message.details['Name'];
        let userName = message.details['userName'];
        let joinDate = message.details['joinDate'];
        sendResponse({'status': 'ok'});

        document.getElementById("nam").value = name
        document.getElementById("u_nam").value = userName
        document.getElementById("j_date").value = joinDate

        chrome.storage.local.get(['data'], function(result) {
            let loading = document.getElementById("process")
            loading.classList.add("hide")

            let data = document.getElementById("data")
            data.classList.remove("display")
        });
    }
    else if(message.type == "googlesheet" && message.from == 'bg'){
        document.getElementById("msg").innerText = message.msg;
    }


})

let btn = document.getElementById("btn");

btn.addEventListener("click", function(){ 
    let personObj = {};
    let name = document.getElementById("nam").value 
    let usrNam = document.getElementById("u_nam").value 
    let joining = document.getElementById("j_date").value
    let url = document.getElementById("url").value;

    personObj.Name = name
    personObj.userName = usrNam
    personObj.joinDate = joining
    personObj.url = url

    chrome.runtime.sendMessage({ "from": "popup", "person_details": personObj})
})

