
document.addEventListener('DOMContentLoaded', (event) => {
    const courseOverview = document.getElementById('courseOverview');
    const courseOverviewText = document.getElementById('courseOverviewText');
    const courseOverviewBar = document.getElementById('courseOverviewBar');
    const minimizeButton = document.getElementById('minimizeOverview');
    const expandButton = document.getElementById('expandOverview');
    const showMoreButton = document.getElementById('showMore');
    const toggleAllButton = document.getElementById('toggleAll');
    const accordionItems = document.querySelectorAll('#courseModules .accordion-item .collapse');

    function updateShowMoreButton() {
        const maxHeight = 255; // Max height specified in CSS
        if (courseOverviewText.scrollHeight > maxHeight + 20) { // Adding a buffer for better accuracy
            showMoreButton.style.display = 'inline-block';
        } else {
            showMoreButton.style.display = 'none';
        }
    }

    function toggleAll(expand) {
        accordionItems.forEach(item => {
            const collapse = new bootstrap.Collapse(item, {
                toggle: false
            });
            if (expand) {
                collapse.show();
            } else {
                collapse.hide();
            }
        });
    }

    // Initial check
    updateShowMoreButton();

    // Check on window resize
    window.addEventListener('resize', updateShowMoreButton);

    // Load state from localStorage
    if (localStorage.getItem('courseOverviewMinimized') === 'true') {
        courseOverview.style.display = 'none';
        courseOverviewBar.style.display = 'block';
    }

    minimizeButton.addEventListener('click', () => {
        courseOverview.style.display = 'none';
        courseOverviewBar.style.display = 'block';
        localStorage.setItem('courseOverviewMinimized', 'true');
    });

    expandButton.addEventListener('click', () => {
        courseOverview.style.display = 'block';
        courseOverviewBar.style.display = 'none';
        localStorage.setItem('courseOverviewMinimized', 'false');
    });

    showMoreButton.addEventListener('click', () => {
        courseOverviewText.classList.toggle('expanded');
        showMoreButton.classList.toggle('expanded');
        if (courseOverviewText.classList.contains('expanded')) {
            showMoreButton.textContent = 'Show Less';
        } else {
            showMoreButton.textContent = 'Show More';
        }
    });
    toggleAllButton.addEventListener('click', () => {
        if (toggleAllButton.textContent === 'Expand All') {
            toggleAll(true);
            toggleAllButton.textContent = 'Collapse All';
        } else {
            toggleAll(false);
            toggleAllButton.textContent = 'Expand All';
        }
    });
});
