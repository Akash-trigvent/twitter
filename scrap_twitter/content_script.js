chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    
    if (message.action == "check") {
        console.log("hello")
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

let fetch_details = document.createElement("button");
fetch_details.textContent = "Get Data";
fetch_details.setAttribute("id", "btn");
fetch_details.addEventListener("click", getDetails);
document.body.appendChild(fetch_details);

document.getElementById("btn").style.cssText = `
position: fixed;
z-Index: 999;
top: 19px;
left: 140px;
background: light-gray;
border-radius: 20px;
border:2px solid black;
background: #3560ff;
color: white;
padding: 5px;
box-shadow: 0px 0px 17px black;
// `;

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


