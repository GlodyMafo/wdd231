document.addEventListener("DOMContentLoaded", () => {
    const directory = document.getElementById("directory");
    const normalViewBtn = document.getElementById("normalView");
    const listViewBtn = document.getElementById("listView");

    async function fetchMembers(isListView = false) {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members, isListView);
    }

    function displayMembers(members, isListView) {
        directory.innerHTML = "";
        directory.className = isListView ? "list-view" : "grid-view";

        if (isListView) {
       
            const table = document.createElement("table");
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Adress</th>
                        <th>Phone</th>
                        <th>Web Site</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            `;
            const tbody = table.querySelector("tbody");

            members.forEach(member => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${member.name}</td>
                    <td>${member.address}</td>
                    <td>${member.phone}</td>
                    <td><a href="${member.website}" target="_blank">${member.website}</a></td>
                `;
                tbody.appendChild(row);
            });

            directory.appendChild(table);
        } else {
        
            members.forEach(member => {
                const memberDiv = document.createElement("div");
                memberDiv.className = "card";
                memberDiv.innerHTML = `
                    <h3>${member.name}</h3>
                    <img src="images/${member.image}" alt="${member.name}">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                `;
                directory.appendChild(memberDiv);
            });
        }
    }

    normalViewBtn.addEventListener("click", () => fetchMembers(false));
    listViewBtn.addEventListener("click", () => fetchMembers(true));

    fetchMembers();
});
