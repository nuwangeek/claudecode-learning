import pygame
import os

def play_sound():
    # Initialize pygame mixer
    pygame.mixer.init()

    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sound_file = os.path.join(script_dir, "ulala.wav")

    # Load and play the sound
    sound = pygame.mixer.Sound(sound_file)
    sound.play()

    # Wait for the sound to finish playing
    while pygame.mixer.get_busy():
        pygame.time.Clock().tick(10)

if __name__ == "__main__":
    play_sound()
