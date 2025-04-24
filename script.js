
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let currentPage = 1;
    let currentProject = 1;
    let currentInterest = 1;
    const totalPages = 3;
    const totalProjects = document.querySelectorAll('.project').length;
    const totalInterests = document.querySelectorAll('.interest').length;
    
    // Update navigation circles based on current page
    function updateNavigationCircles() {
        const circles = document.querySelectorAll('.circle');
        circles.forEach((circle, index) => {
            if (index + 1 <= currentPage) {
                circle.classList.add('active');
            } else {
                circle.classList.remove('active');
            }
        });
    }
    
    // Update current slide indicator
    function updateIndicator(type) {
        const currentElement = document.querySelector(`#${type}s .slider-controls .current`);
        const totalElement = document.querySelector(`#${type}s .slider-controls .total`);
        
        if (type === 'project') {
            currentElement.textContent = currentProject;
            totalElement.textContent = totalProjects;
        } else if (type === 'interest') {
            currentElement.textContent = currentInterest;
            totalElement.textContent = totalInterests;
        }
    }
    
    // Navigation circle click handlers
    document.querySelectorAll('.circle').forEach(circle => {
        circle.addEventListener('click', function() {
            const pageNum = parseInt(this.getAttribute('data-page'));
            navigateToPage(pageNum);
        });
    });
    
    // Navigate to specific page
    function navigateToPage(pageNum) {
        if (pageNum === currentPage) return;
        
        // Hide current page
        document.querySelector('.page.active').classList.remove('active');
        
        // Show new page
        const newPage = document.querySelectorAll('.page')[pageNum - 1];
        newPage.classList.add('active');
        
        // Update current page
        currentPage = pageNum;
        
        // Update navigation circles
        updateNavigationCircles();
    }
    
    // Project slider navigation
    document.getElementById('prev-project').addEventListener('click', () => {
        navigateProjects('prev');
    });
    
    document.getElementById('next-project').addEventListener('click', () => {
        navigateProjects('next');
    });
    
    // Interest slider navigation
    document.getElementById('prev-interest').addEventListener('click', () => {
        navigateInterests('prev');
    });
    
    document.getElementById('next-interest').addEventListener('click', () => {
        navigateInterests('next');
    });
    
    // Navigate between projects with slide animations
    function navigateProjects(direction) {
        // Get current and calculate next
        const currentSlide = document.querySelector('#projects .slide.active');
        let nextIndex;
        
        if (direction === 'next') {
            nextIndex = currentProject >= totalProjects ? 1 : currentProject + 1;
        } else {
            nextIndex = currentProject <= 1 ? totalProjects : currentProject - 1;
        }
        
        const nextSlide = document.querySelectorAll('#projects .slide')[nextIndex - 1];
        
        // Remove active class and animation classes from current
        currentSlide.classList.remove('active');
        
        // Apply animation to next slide background and content
        const bgImage = nextSlide.querySelector('.background-image');
        const content = nextSlide.querySelector('.content');
        
        if (direction === 'next') {
            bgImage.classList.add('slide-in-right');
            content.classList.add('slide-in-left');
        } else {
            bgImage.classList.add('slide-in-left');
            content.classList.add('slide-in-right');
        }
        
        // Make next slide active
        nextSlide.classList.add('active');
        
        // Update current project index
        currentProject = nextIndex;
        
        // Update indicator
        updateIndicator('project');
        
        // Remove animation classes after transition
        setTimeout(() => {
            bgImage.classList.remove('slide-in-right', 'slide-in-left');
            content.classList.remove('slide-in-right', 'slide-in-left');
        }, 500);
    }
    
    // Navigate between interests with slide animations
    function navigateInterests(direction) {
        // Get current and calculate next
        const currentSlide = document.querySelector('#interests .slide.active');
        let nextIndex;
        
        if (direction === 'next') {
            nextIndex = currentInterest >= totalInterests ? 1 : currentInterest + 1;
        } else {
            nextIndex = currentInterest <= 1 ? totalInterests : currentInterest - 1;
        }
        
        const nextSlide = document.querySelectorAll('#interests .slide')[nextIndex - 1];
        
        // Remove active class from current
        currentSlide.classList.remove('active');
        
        // Apply animation to next slide background and content
        const bgImage = nextSlide.querySelector('.background-image');
        const content = nextSlide.querySelector('.content');
        
        if (direction === 'next') {
            bgImage.classList.add('slide-in-right');
            content.classList.add('slide-in-left');
        } else {
            bgImage.classList.add('slide-in-left');
            content.classList.add('slide-in-right');
        }
        
        // Make next slide active
        nextSlide.classList.add('active');
        
        // Update current interest index
        currentInterest = nextIndex;
        
        // Update indicator
        updateIndicator('interest');
        
        // Remove animation classes after transition
        setTimeout(() => {
            bgImage.classList.remove('slide-in-right', 'slide-in-left');
            content.classList.remove('slide-in-right', 'slide-in-left');
        }, 500);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowUp':
                if (currentPage > 1) {
                    navigateToPage(currentPage - 1);
                }
                break;
            case 'ArrowDown':
                if (currentPage < totalPages) {
                    navigateToPage(currentPage + 1);
                }
                break;
            case 'ArrowLeft':
                if (currentPage === 2) {
                    navigateProjects('prev');
                } else if (currentPage === 3) {
                    navigateInterests('prev');
                }
                break;
            case 'ArrowRight':
                if (currentPage === 2) {
                    navigateProjects('next');
                } else if (currentPage === 3) {
                    navigateInterests('next');
                }
                break;
        }
    });
    
    // Mouse wheel navigation between pages
    let wheelTimeout;
    window.addEventListener('wheel', function(e) {
        // Prevent rapid firing
        if (wheelTimeout) return;
        
        wheelTimeout = setTimeout(() => {
            wheelTimeout = null;
        }, 1000);
        
        if (e.deltaY > 0 && currentPage < totalPages) {
            // Scrolling down
            navigateToPage(currentPage + 1);
        } else if (e.deltaY < 0 && currentPage > 1) {
            // Scrolling up
            navigateToPage(currentPage - 1);
        }
    });
    
    // Initialize indicators
    updateIndicator('project');
    updateIndicator('interest');
});
