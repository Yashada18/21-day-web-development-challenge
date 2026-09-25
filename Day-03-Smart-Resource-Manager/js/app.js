
// Calculate total resource units
const totalResources = resourceData.reduce(
    (sum, resource) => sum + resource.total,
    0
);

// Calculate available units
const availableResources = resourceData.reduce(
    (sum, resource) => sum + resource.available,
    0
);

// Count resource categories needing attention
const lowResources = resourceData.filter(
    resource =>
        resource.status === "Low" ||
        resource.status === "Warning"
).length;

// Display the results
document.getElementById("total-resources").textContent =
    totalResources;

document.getElementById("available-resources").textContent =
    availableResources;

document.getElementById("low-resources").textContent =
    lowResources;

// Display resource utilization

const utilizationList =
    document.getElementById("utilization-list");

resourceData.forEach((resource, index) => {

    const utilizationItem =
        document.createElement("div");

    utilizationItem.classList.add("utilization-item");

    utilizationItem.style.animationDelay =
        `${index * 0.12}s`;

    utilizationItem.innerHTML = `
        <div class="utilization-circle"
             style="--progress: ${resource.utilization}%;">
            
            <div class="circle-content">
                <strong>${resource.utilization}%</strong>
                <span>USED</span>
            </div>

        </div>

        <div class="utilization-info">
            <strong>${resource.name}</strong>
            <span>${resource.category}</span>
        </div>
    `;

    utilizationList.appendChild(utilizationItem);
});

// Display resource table

function displayResources(data) {

    const resourceTableBody =
        document.getElementById("resource-table-body");

    resourceTableBody.innerHTML = "";

    data.forEach(resource => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <strong>${resource.name}</strong>
            </td>

            <td>
                ${resource.category}
            </td>

            <td>
                ${resource.available} / ${resource.total}
            </td>

            <td>
                ${resource.utilization}%
            </td>

            <td>
                <span class="status ${resource.status.toLowerCase()}">
                    ${resource.status}
                </span>
            </td>

            <td>
                ${resource.assignedTo}
            </td>
        `;

        resourceTableBody.appendChild(row);
    });
}
displayResources(resourceData);

const searchInput =
    document.getElementById("resource-search");

const categoryFilter =
    document.getElementById("category-filter");

const statusFilter =
    document.getElementById("status-filter");

function filterResources() {

    const searchText =
        searchInput.value.toLowerCase();

    const selectedCategory =
        categoryFilter.value;

    const selectedStatus =
        statusFilter.value;

    const filteredResources =
        resourceData.filter(resource => {

            const matchesSearch =
                resource.name
                    .toLowerCase()
                    .includes(searchText);

            const matchesCategory =
                selectedCategory === "all" ||
                resource.category === selectedCategory;

            const matchesStatus =
                selectedStatus === "all" ||
                resource.status === selectedStatus;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });

    displayResources(filteredResources);
}

searchInput.addEventListener(
    "input",
    filterResources
);

categoryFilter.addEventListener(
    "change",
    filterResources
);

statusFilter.addEventListener(
    "change",
    filterResources
);
// Display resource alerts

const alertsList =
    document.getElementById("alerts-list");

const alertResources = resourceData.filter(
    resource =>
        resource.status === "Low" ||
        resource.status === "Warning"
);

alertResources.forEach(resource => {

    const alertCard = document.createElement("article");

    alertCard.classList.add(
        "alert-item",
        resource.status.toLowerCase()
    );

    alertCard.innerHTML = `
        <div class="alert-icon">
            ${resource.status === "Low" ? "!" : "⚠"}
        </div>

        <div class="alert-content">

            <p>${resource.status.toUpperCase()}</p>

            <h3>${resource.name}</h3>

            <span>
                ${resource.available} units available
                · ${resource.utilization}% utilized
            </span>

        </div>

        <div class="alert-action">
            ↗
        </div>
    `;

    alertsList.appendChild(alertCard);
});