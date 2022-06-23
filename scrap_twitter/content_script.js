chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    
    if (message.action == "check") {
        console.log("hello")
        getDetails()
        setTimeout(() => {
            console.log(details);
        }, 1000);
        
        setTimeout(() => {
            chrome.runtime.sendMessage({ "type": "sendDetails", "details": details }, function (resp) {
                console.log(resp);
            })
            chrome.storage.local.set({"data":"sent"})
        }, 2000);
    }
})

let details = {};
function getDetails() {
    let data = document.querySelector('[data-testid="UserName"]')
    let childData = data.firstChild.children[0]
    let firstChild = childData.firstChild
    let lastChild = childData.lastChild
    let name = firstChild.innerText
    details.Name = name;

    let userName = lastChild.innerText
    details.userName = userName;

    let role = document.querySelector('[data-testid="UserJoinDate"]')
    let UserJoinDate = role.innerText
    details.joinDate = UserJoinDate

    
}


