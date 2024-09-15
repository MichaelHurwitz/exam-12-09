// Load default soldiers if none are stored
function loadInitialSoldiers() {
    if (!localStorage.getItem('soldiers')) {
        const initialSoldiers = [
            { fullName: "Ariel Ohana", rank: "Sergeant First Class", role: "Combat Soldier", company: "Pluga B", status: "Active", mission: 30 },
            { fullName: "Matanel Vatkin", rank: "Sergeant", role: "Mashak Tash", company: "Haredim Management", status: "Active", mission: 50 },
            { fullName: "Omri Rajuan", rank: "Sergeant", role: "Mashak Tash", company: "Shahar", status: "Retired", mission: 50 }
        ];
        localStorage.setItem('soldiers', JSON.stringify(initialSoldiers));
    }
}

// Retrieve soldiers from localStorage
function getSoldiers() {
    return JSON.parse(localStorage.getItem('soldiers')) || [];
}

// Save soldiers to localStorage
function saveSoldiers(soldiers) {
    localStorage.setItem('soldiers', JSON.stringify(soldiers));
}
