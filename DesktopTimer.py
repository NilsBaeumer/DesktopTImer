import tkinter as tk
import threading
import time
import pygame


class TimerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Timer App")
        self.root.geometry("400x350")

        self.root.configure(bg="#f0f0f0")  # Hintergrundfarbe festlegen

        # Icon festlegen (Pfad zum Icon anpassen)
        icon_path = "C:\\Users\\baeum\\Python\\DesktopTimer\\Icon\\Icon.ico"
        self.root.iconbitmap(icon_path)

        self.hours_var = tk.IntVar()
        self.minutes_var = tk.IntVar()
        self.seconds_var = tk.IntVar()

        self.create_widgets()

        self.running = False
        self.seconds_left = 0
        self.sound_playing = False

    def create_widgets(self):
        self.label_hours = tk.Label(
            self.root, text="Stunden:", font=("Helvetica", 16), bg="#f0f0f0"
        )
        self.label_hours.pack(pady=10)
        self.entry_hours = tk.Entry(
            self.root, textvariable=self.hours_var, font=("Helvetica", 16)
        )
        self.entry_hours.pack()

        self.label_minutes = tk.Label(
            self.root, text="Minuten:", font=("Helvetica", 16), bg="#f0f0f0"
        )
        self.label_minutes.pack(pady=10)
        self.entry_minutes = tk.Entry(
            self.root, textvariable=self.minutes_var, font=("Helvetica", 16)
        )
        self.entry_minutes.pack()

        self.label_seconds = tk.Label(
            self.root, text="Sekunden:", font=("Helvetica", 16), bg="#f0f0f0"
        )
        self.label_seconds.pack(pady=10)
        self.entry_seconds = tk.Entry(
            self.root, textvariable=self.seconds_var, font=("Helvetica", 16)
        )
        self.entry_seconds.pack()

        self.start_button = tk.Button(
            self.root,
            text="Start Timer",
            command=self.start_timer,
            font=("Helvetica", 16),
            bg="#4CAF50",
            fg="white",
        )
        self.start_button.pack(pady=20)

        self.stop_button = tk.Button(
            self.root,
            text="Stop Timer",
            command=self.stop_timer,
            font=("Helvetica", 16),
            bg="#F44336",
            fg="white",
        )
        self.stop_button.pack(pady=10)

        self.time_remaining_label = tk.Label(
            self.root, text="", font=("Helvetica", 24), bg="#f0f0f0"
        )
        self.time_remaining_label.pack()

        self.progress_bar = tk.Canvas(
            self.root, width=300, height=20, bg="#E0E0E0", bd=0, highlightthickness=0
        )
        self.progress_bar.pack(pady=10)

    def start_timer(self):
        hours = self.hours_var.get()
        minutes = self.minutes_var.get()
        seconds = self.seconds_var.get()

        total_seconds = hours * 3600 + minutes * 60 + seconds

        if total_seconds <= 0:
            return

        self.seconds_left = total_seconds
        self.update_time_remaining()
        self.running = True
        threading.Thread(target=self.run_timer).start()

    def run_timer(self):
        while self.running and self.seconds_left > 0:
            time.sleep(1)
            self.seconds_left -= 1
            self.update_time_remaining()
            if self.running:
                self.update_progress_bar()

        if self.running:
            self.play_sound()

    def update_time_remaining(self):
        hours = self.seconds_left // 3600
        minutes = (self.seconds_left % 3600) // 60
        seconds = self.seconds_left % 60
        time_str = f"{hours:02}:{minutes:02}:{seconds:02}"
        self.time_remaining_label.config(text=time_str)

    def update_progress_bar(self):
        total_seconds = (
            self.hours_var.get() * 3600
            + self.minutes_var.get() * 60
            + self.seconds_var.get()
        )

        if total_seconds == 0:
            return

        progress = 100 - (self.seconds_left * 100 / total_seconds)
        self.progress_bar.delete("progress")
        self.progress_bar.create_rectangle(
            0, 0, progress * 3, 20, fill="#4CAF50", tags="progress"
        )

    def play_sound(self):
        sound_path = "C:\\Users\\baeum\\Python\\DesktopTimer\\Sound\\retrosound.wav"
        pygame.mixer.init()
        pygame.mixer.music.load(sound_path)
        pygame.mixer.music.play()
        self.sound_playing = True

    def stop_timer(self):
        if self.sound_playing:
            pygame.mixer.music.stop()
            self.sound_playing = False

        self.running = False
        self.seconds_left = 0
        self.update_time_remaining()
        self.update_progress_bar()


if __name__ == "__main__":
    root = tk.Tk()
    app = TimerApp(root)
    root.mainloop()

