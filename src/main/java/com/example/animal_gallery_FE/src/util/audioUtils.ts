export const playClickSound = () => {
  try {
    const audio = new Audio('/audio/mouse-click.mp3');
    audio.volume = 0.3; // Set volume to 30% to avoid being too loud
    audio.play().catch(error => {
      // Silently handle audio play errors (e.g., user hasn't interacted with page yet)
      console.log('Audio play blocked:', error);
    });
  } catch (error) {
    // Silently handle any audio creation errors
    console.log('Audio creation error:', error);
  }
}; 