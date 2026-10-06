const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

function toggleMenu(force) {
    const isOpen = typeof force === "boolean" ? force : !mobileMenu.classList.contains("active");
    mobileMenu.classList.toggle("active", isOpen);
    menuButton.classList.toggle("active", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
}

menuButton.addEventListener("click", () => toggleMenu());
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => toggleMenu(false)));

function openProject(project) {
    const { title, category, description, image } = project.dataset;
    modalImage.src = image;
    modalImage.alt = title;
    modalCategory.textContent = category;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose.focus();
}

function closeProject() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll(".project").forEach((project) => {
    project.addEventListener("click", () => openProject(project));
    project.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProject(project);
        }
    });
});

modalClose.addEventListener("click", closeProject);
modal.addEventListener("click", (event) => {
    if (event.target === modal) closeProject();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProject();
        toggleMenu(false);
    }
});
