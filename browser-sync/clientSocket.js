let urlParams = new URLSearchParams(window.location.search);
let socket = io("https://browser-sync.herokuapp.com", {
    extraHeaders: {
        "domain": window.location.origin,
        "id": urlParams.get('id')
    }
});

let main = false;
let domain = window.location.origin;

//Check if page is reloaded and if it has focus - then emit reload event
if (performance.navigation.type == performance.navigation.TYPE_RELOAD && document.hasFocus()) {
    socket.emit("reload", {
        domain: domain,
        id: urlParams.get('id'),
    });
    main = true;
}

window.addEventListener('focus', () => {
    main = true;
});
window.addEventListener('blur', () => {
    main = false;
});


socket.on("reloadBack", (arg) => {
    if (main == false && !document.hasFocus()) {
        location.reload();
    }
});

socket.on("scrollBack", (arg) => {

    if (main == false) {
        window.scrollTo(0, arg);
    }

});

socket.on("scrollWheelBack", (arg) => {

    if (main == false) {
        window.scrollBy(0, arg);
    }

});

window.addEventListener("scroll", event => {

    if (main == false) return;

    socket.emit("scroll", {
        domain: domain,
        id: urlParams.get('id'),
        data: scrollY
    });

});

window.addEventListener('click', function(event) {
    socket.emit('click', {
        domain: domain,
        id: urlParams.get('id'),
        data: event.target.href
    });
});

socket.on("clickBack", (arg) => {
    if ((arg !== null) && (arg !== undefined)) {
        window.location.href = arg
    }
});


window.addEventListener("wheel", event => {

    let documentHeight = document.body.scrollHeight;
    let currentScroll = window.scrollY + window.innerHeight;

    if (currentScroll + 5 > documentHeight) {
        //WE ARE ON TOP
        if (event.deltaY > 0) {
            main = true;
            socket.emit("scrollWheel", {
                domain: domain,
                id: urlParams.get('id'),
                data: event.deltaY
            })
        }

    } else if (window.scrollY < 100) {
        //WE ARE ON BOTTOM BOTTOM
        if (event.deltaY < 0) {
            main = true;
            socket.emit("scrollWheel", {
                domain: domain,
                id: urlParams.get('id'),
                data: event.deltaY
            })
        }

    }
});