const searchInput = document.getElementById("searchInput");
const locationInput = document.getElementById("locationInput");
const searchBtn = document.getElementById("searchBtn");
const noJobsMessage = document.getElementById("noJobsMessage");
const jobCount = document.getElementById("jobCount");



searchBtn.addEventListener("click", function () {

    searchBtn.textContent = "Searching...";
    searchBtn.disabled = true;

    setTimeout(function () {

        const keyword = searchInput.value.toLowerCase().trim();
        const location = locationInput.value.toLowerCase();
        const jobCards = document.querySelectorAll(".job-card");

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

        if (visibleJobs === 1) {

    jobCount.textContent = "1 job found";

} else {

    jobCount.textContent = `${visibleJobs} jobs found`;

}

        searchBtn.textContent = "Search";
        searchBtn.disabled = false;

    }, 500);

});

searchInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        searchBtn.click();

    }

});


const jobs = [
    {
        title: "Frontend Developer",
        company: "TechNova Solutions",
        location: "Pune",
        type: "Full-time",
        salary: "₹6–8 LPA",
        description: "Build responsive web interfaces and reusable UI components.",
        skills: ["React", "JavaScript", "CSS"]
    },

    {
        title: "Python Developer Intern",
        company: "DataWorks",
        location: "Bangalore",
        type: "Internship",
        salary: "₹20,000–25,000/month",
        description: "Develop Python applications, work with APIs, and assist with backend development.",
        skills: ["Python", "Flask", "SQL"]
    },

    {
        title: "UI/UX Designer",
        company: "Pixel Studio",
        location: "Mumbai",
        type: "Full-time",
        salary: "₹5–7 LPA",
        description: "Design intuitive digital experiences, create prototypes, and improve user interfaces.",
        skills: ["Figma", "UI Design", "UX"]
    }
];

const jobContainer = document.getElementById("jobContainer");

jobs.forEach(function (job) {

    jobContainer.innerHTML += `
        <div class="col-lg-4 col-md-6">

            <div class="card job-card h-100">

                <div class="card-body">

                    <div class="d-flex justify-content-between">

                        <span class="badge text-bg-light">
                            ${job.type}
                        </span>

                    </div>

                    <h4 class="card-title mt-4">
                        ${job.title}
                    </h4>

                    <p class="text-secondary mb-1">
                        ${job.company}
                    </p>

                    <p class="text-secondary small">
                        📍 ${job.location}
                    </p>

                    <p class="small mt-3">
                    ${job.description}
                    </p>

                    <p class="fw-semibold mt-3">
                    ${job.salary}</p>

                    <div class="mt-4">

                        ${job.skills.map(function (skill) {
                            return `
                                <span class="badge rounded-pill text-bg-light">
                                    ${skill}
                                </span>
                            `;
                        }).join("")}

                    </div>

                    <button 
                         class="btn btn-dark mt-4 view-job-btn"
                         data-job-index="${jobs.indexOf(job)}">
                       View Details
                    </button>

                </div>

            </div>

        </div>
    `;

});

const viewButtons = document.querySelectorAll(".view-job-btn");
viewButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const jobIndex = button.dataset.jobIndex;
        const job = jobs[jobIndex];
        console.log(job);

         document.getElementById("modalJobTitle").textContent = job.title;
        document.getElementById("modalCompany").textContent = job.company;
        document.getElementById("modalLocation").textContent = "📍 " + job.location;
        document.getElementById("modalType").textContent = job.type;
        document.getElementById("modalSalary").textContent = job.salary;
        document.getElementById("modalDescription").textContent = job.description;

        document.getElementById("modalSkills").innerHTML =
    job.skills.map(function (skill) {
        return `
            <span class="badge rounded-pill text-bg-light me-1">
                ${skill}
            </span>
        `;
    }).join("");

        // Show the modal
        const modal = new bootstrap.Modal(
            document.getElementById("jobModal")
        );

        modal.show();

    });

});

const applyBtn = document.getElementById("applyBtn");

applyBtn.addEventListener("click", function () {

    const jobTitle = document.getElementById("modalJobTitle").textContent;

    document.getElementById("applyJobTitle").textContent = jobTitle;

    const applicationModal = new bootstrap.Modal(
        document.getElementById("applicationModal")
    );

    const successMessage =
    document.getElementById("applicationSuccess");

successMessage.classList.add("d-none");

    applicationModal.show();

});

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Update active button
        filterButtons.forEach(function (btn) {
            btn.classList.remove("btn-dark");
            btn.classList.add("btn-outline-dark");
        });

        button.classList.remove("btn-outline-dark");
        button.classList.add("btn-dark");


        const selectedType = button.dataset.type;

        const jobCards = document.querySelectorAll(".job-card");

        let visibleJobs = 0;


        // Filter cards
        jobCards.forEach(function (card) {

            const cardType = card.querySelector(".badge").innerText.trim();

            if (selectedType === "All" || cardType === selectedType) {

                card.parentElement.style.display = "";

                visibleJobs++;

            } else {

                card.parentElement.style.display = "none";

            }

        });


        // Update job count
        const jobCount = document.getElementById("jobCount");

        if (visibleJobs === 1) {

            jobCount.textContent = "1 job found";

        } else {

            jobCount.textContent = `${visibleJobs} jobs found`;

        }


        // Update no jobs message
        if (visibleJobs === 0) {

            noJobsMessage.classList.remove("d-none");

        } else {

            noJobsMessage.classList.add("d-none");

        }

    });

});


const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", function () {

    searchInput.value = "";

    locationInput.value = "Select location";

    selectedType = "All";

    filterJobs();

    filterButtons.forEach(function (btn) {

        btn.classList.remove("btn-dark");
        btn.classList.add("btn-outline-dark");

    });

    const allButton = document.querySelector('.filter-btn[data-type="All"]');

    allButton.classList.remove("btn-outline-dark");
    allButton.classList.add("btn-dark");

});

const applicationForm = document.getElementById("applicationForm");

applicationForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const successMessage =
        document.getElementById("applicationSuccess");

    successMessage.classList.remove("d-none");

    applicationForm.reset();

    setTimeout(function () {

        const applicationModal =
            bootstrap.Modal.getInstance(
                document.getElementById("applicationModal")
            );

        applicationModal.hide();

    }, 1500);

});