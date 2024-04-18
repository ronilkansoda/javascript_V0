function createCard(title, cName, views, monthsOld, duration, thumbnail) {

    let nv;
    if (views > 1000 && views < 1000000) {
        nv = views / 1000 + "K"
        // console.log(nv + "K") 
        // v = document.getElementById("views")
        // v.innerHTML = nv + "K"
    }
    else if (views > 1000000) {
        nv = views / 1000000 + "M"
        // console.log(nv + "M")
        // v = document.getElementById("views")
        // v.innerHTML = nv + "M"
    }
    else {
        nv = views
        // console.log(views) 
        // v = document.getElementById("views")
        // v.innerHTML = views
    }

   // t = document.getElementById("title")
    // t.innerHTML = title
    // cn = document.getElementById("chan-name")
    // cn.innerHTML = cName
    // var d = new Date()
    // d1 = d.setTime()
    // console.log(d.getSeconds())
    // m = document.getElementById("time")
    // m.innerHTML = monthsOld + " months ago"
    // d = document.getElementById("status")
    // d.innerHTML = duration
    // var i = document.querySelector(".thumn .image img")
    // i.src = thumbnail

    let html = ` 
    <div class="card">
        <div class="left-card">
            <div class="thumn">
                <a href="#">
                    <div class="image"><img src="${thumbnail}" alt=""></div> 
                    <div id ="status">${duration}</div>
                </a>
            </div>
        </div>

        <div class="right-card">
            <div class="card-title text">
                <h3 id="title">${title}</h3>
            </div>
            <div class="card-desc text-desc">
                <span id="chan-name">${cName}</span>
                <span class="separator">•</span>
                <span id="views">${nv}</span>
                <span class="separator">•</span>
                <span id="time">${monthsOld} months ago</span>
            </div>
        </div>
    </div>`

    document.querySelector(".container").innerHTML = document.querySelector(".container").innerHTML + html
}

createCard("Introduction to Backend | Sigma Web Dev video #2", "CodeWithHarry", 5600000, 2, "31:22", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw")


createCard("Introduction to Backend | Sigma Web Dev video #2", "CodeWithHarry", 5600000, 2, "31:22", "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLACwWOixJVrKLFindK92kYMgTcQbw")
