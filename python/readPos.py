import pyautogui
import keyboard
import time
import win32api, win32con
import random
while not keyboard.is_pressed('l') == True:
    print(win32api.GetCursorPos())
    time.sleep(0.5)