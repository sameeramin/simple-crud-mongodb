const update = document.querySelector("#update-button");

// Send a PUT request to the server
update.addEventListener("click", (_) => {
    fetch("/quotes", {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Darth Vader",
            quote: "I find your lack of faith disturbing.",
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((response) => {
            window.location.reload(true);
        });
});

// Send a DELETE request to the server
const deleteQuote = document.querySelector("#delete-button");

deleteQuote.addEventListener("click", (_) => {
    fetch("/quotes", {
        method: "delete",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: "Darth Vader",
        }),
    })
        .then((res) => {
            if (res.ok) return res.json();
        })
        .then((data) => {
            window.location.reload();
        });
});
