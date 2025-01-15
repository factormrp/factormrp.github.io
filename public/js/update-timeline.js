document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline');
    const timelineItemsLeft = document.querySelectorAll('.timeline-item.left');
    const timelineItemsRight = document.querySelectorAll('.timeline-item.right');

    if (timeline) {
        const timelineLeft = window.innerWidth;

        timelineItemsLeft.forEach((item) => {
            const itemLeft = item.getBoundingClientRect().left;
            const dotLeft = timelineLeft;
            // Set the CSS variable for the dot's position
            // item.style.setProperty('--timeline-dot-left', `${dotLeft}px`);
            item.style.setProperty('--timeline-dot-left', `0px`);
        });

        const timelineRight = timeline.getBoundingClientRect().left;

        timelineItemsRight.forEach((item) => {
            const itemRight = item.getBoundingClientRect().left;
            const dotRight = timelineRight - itemRight;

            // Set the CSS variable for the dot's position
            item.style.setProperty('--timeline-dot-right', `${dotRight}px`);
        });
    }
});
