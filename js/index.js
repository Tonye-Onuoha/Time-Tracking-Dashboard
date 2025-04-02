const dailyButton = document.getElementById("daily");
const weeklyButton = document.getElementById("weekly");
const monthlyButton = document.getElementById("monthly");
const ellipsisIcons = document.getElementsByClassName("ellipsis");
const ellipsisIconsArray = Array.from(ellipsisIcons);
const periodsMap = new Map();
let currentPeriodsArray;
let previousPeriodsArray;

async function fetchDashboardData() {
    // This function retrieves the data from the "data.json" file located in the root directory of the project.
    const response = await fetch("https://time-tracking-dashboard-eight-ebon.vercel.app/data.json/");
    const data = response.json();
    return data;
}

function screenUpdate(interval, description) {
    // This function updates the screen with the data from the "data.json" file.
    currentPeriodsArray.forEach((currentPeriod) => {
        const title = currentPeriod.dataset.activity;
        const periodData = periodsMap.get(title);
        currentPeriod.textContent = periodData[interval].current === 1 ? "1hr" : `${periodData[interval].current}hrs`;
        currentPeriod.style.opacity = 1;
    });
    previousPeriodsArray.forEach((previousPeriod) => {
        const title = previousPeriod.dataset.activity;
        const periodData = periodsMap.get(title);
        previousPeriod.textContent =
            periodData[interval].previous === 1
                ? `${description} - 1hr`
                : `${description} - ${periodData[interval].previous}hrs`;
        previousPeriod.style.opacity = 1;
    });
}

// Initialize the default screen setting.
fetchDashboardData()
    .then((data) => {
        data.map((activity) => {
            periodsMap.set(activity.title, activity.timeframes);
        });
    })
    .then(() => {
        const currentPeriods = document.getElementsByClassName("current-period");
        const previousPeriods = document.getElementsByClassName("previous-period");
        currentPeriodsArray = Array.of(...currentPeriods);
        previousPeriodsArray = Array.of(...previousPeriods);
        screenUpdate("daily", "Yesterday");
        dailyButton.style.color = "#ffffff";
        dailyButton.onmouseover = dailyButton.style.cursor = "default";
    });

/* Event listeners */

dailyButton.addEventListener("click", () => {
    if (!periodsMap.size || dailyButton.style.cursor === "default") return;
    screenUpdate("daily", "Yesterday");
    dailyButton.style.color = "#ffffff";
    weeklyButton.style.color = "hsl(235, 45%, 61%)";
    monthlyButton.style.color = "hsl(235, 45%, 61%)";
    dailyButton.onmouseover = dailyButton.style.cursor = "default";
    weeklyButton.onmouseover = weeklyButton.style.cursor = "pointer";
    monthlyButton.onmouseover = monthlyButton.style.cursor = "pointer";
});

weeklyButton.addEventListener("click", () => {
    if (!periodsMap.size || weeklyButton.style.cursor === "default") return;
    screenUpdate("weekly", "Last Week");
    weeklyButton.style.color = "#ffffff";
    dailyButton.style.color = "hsl(235, 45%, 61%)";
    monthlyButton.style.color = "hsl(235, 45%, 61%)";
    weeklyButton.onmouseover = weeklyButton.style.cursor = "default";
    dailyButton.onmouseover = dailyButton.style.cursor = "pointer";
    monthlyButton.onmouseover = monthlyButton.style.cursor = "pointer";
});

monthlyButton.addEventListener("click", () => {
    if (!periodsMap.size || monthlyButton.style.cursor === "default") return;
    screenUpdate("monthly", "Last Month");
    monthlyButton.style.color = "#ffffff";
    dailyButton.style.color = "hsl(235, 45%, 61%)";
    weeklyButton.style.color = "hsl(235, 45%, 61%)";
    monthlyButton.onmouseover = monthlyButton.style.cursor = "default";
    dailyButton.onmouseover = dailyButton.style.cursor = "pointer";
    weeklyButton.onmouseover = weeklyButton.style.cursor = "pointer";
});

ellipsisIconsArray.forEach((ellipsisIcon) => {
    ellipsisIcon.addEventListener("mouseover", (e) => (e.currentTarget.src = "../images/icon-ellipsis-hover.svg"));
    ellipsisIcon.addEventListener("mouseout", (e) => (e.currentTarget.src = "../images/icon-ellipsis.svg"));
});
