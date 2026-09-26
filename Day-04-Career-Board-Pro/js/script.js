const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const noJobsMessage = document.getElementById("noJobsMessage");

const jobCards = document.querySelectorAll(".job-card");


searchBtn.addEventListener("click", function () {

    const keyword = searchInput.value.toLowerCase().trim();
    const location = locationInput.value.toLowerCase();

    let visibleJobs = 0;

    jobCards.forEach(function (card) {

        const cardText = card.innerText.toLowerCase();

        const matchesKeyword =
            keyword === "" || cardText.includes(keyword);

        const matchesLocation =
            location === "select location" ||
            cardText.includes(location);

        if (matchesKeyword && matchesLocation) {

            card.closest(".col-lg-4").style.display = "";

            visibleJobs++;

        } else {

            card.closest(".col-lg-4").style.display = "none";

        }

    });


    if (visibleJobs === 0) {

        noJobsMessage.classList.remove("d-none");

    } else {

        noJobsMessage.classList.add("d-none");

    }

});


searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});