const mainContainer = document.querySelector(".main-container"),
      imagePreviews = document.querySelectorAll(".image-preview"),  // changed to querySelectorAll for multiple elements
      images = document.querySelectorAll(".image-preview img"),     // changed to querySelectorAll for multiple elements
      videos = document.querySelectorAll(".image-preview video");   // changed to querySelectorAll for multiple elements

window.onload = () => {
    const setOpacity = (opacity) => images.forEach(img => img.style.opacity = opacity);
    
    // Mouse enter and leave events on main container for overall opacity change
    mainContainer.onmouseenter = () => setOpacity(0.2);
    mainContainer.onmouseleave = () => setOpacity(1);

    // GSAP animation for initial load of image previews
    gsap.fromTo(imagePreviews,
        { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0 }, 
        { duration: 1.5, clipPath: "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, stagger: 0.2, ease: "power2.out" }
    );

    // Loop through each image preview to add mouseenter and mouseleave events
    imagePreviews.forEach((preview, index) => {
        const expandCard = (flexValue) => gsap.to(preview, { duration: 0.5, flex: flexValue, ease: "power2.inOut" });
        
        preview.onmouseenter = () => { 
            expandCard(2); 
            videos[index].play(); // Play the associated video on hover
        };
        
        preview.onmouseleave = () => { 
            expandCard(1); 
            videos[index].pause(); // Pause the associated video on leave
        };
    });
};
