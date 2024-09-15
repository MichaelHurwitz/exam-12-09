document.addEventListener('DOMContentLoaded', () => {
    const soldiersTableBody = document.getElementById('soldiers-table-body');
    const sortSoldiersBtn = document.getElementById('sort-soldiers-btn');
    const soldierForm = document.getElementById('soldier-form');
    const editSoldierForm = document.getElementById('edit-soldier-form');
    const cancelEditBtn = document.getElementById('cancel-edit');

    let editingSoldierIndex = null;
    let isSortAsc = true;

    // Load initial soldiers and render
    loadInitialSoldiers();
    renderSoldiers();

    // Sort soldiers by full name
    sortSoldiersBtn.addEventListener('click', () => {
        const soldiers = getSoldiers();
        soldiers.sort((a, b) => (isSortAsc ? a.fullName.localeCompare(b.fullName) : b.fullName.localeCompare(a.fullName)));
        isSortAsc = !isSortAsc;
        sortSoldiersBtn.textContent = isSortAsc ? 'Full Name ↓' : 'Full Name ↑';
        saveSoldiers(soldiers);
        renderSoldiers();
    });

    // Handle form submissions
    soldierForm.addEventListener('submit', handleAddSoldier);
    editSoldierForm.addEventListener('submit', handleSaveEdit);
    soldiersTableBody.addEventListener('click', handleTableActions);
    cancelEditBtn.addEventListener('click', resetForm);

    // Render soldiers into the table
    function renderSoldiers() {
        const soldiers = getSoldiers();
        soldiersTableBody.innerHTML = soldiers.length > 0
            ? soldiers.map((soldier, index) => createSoldierRow(soldier, index)).join('')
            : '<tr><td colspan="6">No soldiers found</td></tr>';
    }

    // Create soldier row HTML
    function createSoldierRow(soldier, index) {
        return `
            <tr>
                <td>${soldier.fullName}</td>
                <td>${soldier.rank}</td>
                <td>${soldier.role}</td>
                <td>${soldier.company}</td>
                <td>${soldier.status}</td>
                <td>
                    <div class="button-group">
                        <button class="mission-btn" data-index="${index}">Start Mission</button>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    }

    // Handle soldier addition
    function handleAddSoldier(e) {
        e.preventDefault();
        const soldiers = getSoldiers();
        soldiers.push(getFormData(soldierForm));
        saveSoldiers(soldiers);
        renderSoldiers();
        resetForm();
    }

    // Handle soldier edit and delete
    function handleTableActions(e) {
        const index = e.target.getAttribute('data-index');
        const soldiers = getSoldiers();
        if (e.target.classList.contains('edit-btn')) {
            populateEditForm(soldiers[index]);
            editingSoldierIndex = index;
            toggleSections('edit');
        } else if (e.target.classList.contains('delete-btn')) {
            soldiers.splice(index, 1);
            saveSoldiers(soldiers);
            renderSoldiers();
        } else if (e.target.classList.contains('mission-btn')) {
            startMission(e, soldiers[index]);
        }
    }

    // Handle saving edited soldier
    function handleSaveEdit(e) {
        e.preventDefault();
        const soldiers = getSoldiers();
        soldiers[editingSoldierIndex] = getFormData(editSoldierForm);
        saveSoldiers(soldiers);
        renderSoldiers();
        resetForm();
    }

    // Start mission timer
    function startMission(e, soldier) {
        let missionTime = soldier.mission;
        if (e.target.disabled) return;
        e.target.disabled = true;
        const interval = setInterval(() => {
            missionTime--;
            e.target.textContent = `Mission: ${missionTime}s`;
            if (missionTime <= 0) {
                clearInterval(interval);
                e.target.textContent = 'Mission Complete';
                e.target.disabled = false;
            }
        }, 1000);
    }

    // Get form data
    function getFormData(form) {
        return {
            fullName: form['full-name'].value,
            rank: form['rank'].value,
            role: form['role'].value,
            company: form['company'].value,
            status: form['status'].value,
            mission: parseInt(form['mission-time'].value, 10),
        };
    }

    // Populate edit form with soldier data
    function populateEditForm(soldier) {
        editSoldierForm['full-name'].value = soldier.fullName;
        editSoldierForm['rank'].value = soldier.rank;
        editSoldierForm['role'].value = soldier.role;
        editSoldierForm['company'].value = soldier.company;
        editSoldierForm['status'].value = soldier.status;
        editSoldierForm['mission-time'].value = soldier.mission;
    }

    // Toggle between create and edit sections
    function toggleSections(section) {
        const headerText = document.getElementById('form-header-text');
        const isEditing = section === 'edit';
        document.getElementById('create-section').classList.toggle('hidden', isEditing);
        document.getElementById('edit-section').classList.toggle('hidden', !isEditing);
        document.getElementById('overview-section').classList.toggle('hidden', isEditing); // Hide overview
        headerText.textContent = isEditing ? 'EDIT SOLDIER' : 'BATTALION FORCE MANAGEMENT';
    }

    // Reset forms and toggle sections back to create mode
    function resetForm() {
        toggleSections('create');
        soldierForm.reset();
        editSoldierForm.reset();
        editingSoldierIndex = null;
    }
});
