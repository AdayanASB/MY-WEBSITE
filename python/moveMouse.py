import pyautogui
import keyboard
import time
import win32api, win32con
import random
time.sleep(15)
i=0
xValues=[268, 360, 452, 545,  640, 733, 821, 921, 1021, 1100,  1202, 1295, 1394, 1475, 1579,1674,1762,1855]
yValues=[230,  283, 368, 442, 514, 613, 666, 745, 808]

def click(x,y):
    win32api.SetCursorPos((x,y))
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTDOWN, x,y)
    time.sleep(0.2)
    win32api.mouse_event(win32con.MOUSEEVENTF_LEFTUP,x,y)
def drag(x,y):
    x2=1185
    y2=1079
    x3=x2
    y3=91
    x4=1645
    y4=1068
    pyautogui.moveTo(x,y)
    pyautogui.mouseDown(x,y,duration=1)
    
    pyautogui.moveTo(x3, y3,1)

    pyautogui.hotkey('alt','tab')
    time.sleep(1)
    pyautogui.mouseUp()
    pyautogui.hotkey('ctrl', 'shift','x')
    time.sleep(2)
    pyautogui.hotkey('enter')
    time.sleep(0.75)
    pyautogui.hotkey('alt','shift','ctrl','w')
    time.sleep(5)
    pyautogui.moveTo(x4,y4)
    time.sleep(0.1)
    pyautogui.click()
    time.sleep(0.1)
    time.sleep(1)
    pyautogui.keyDown('enter')
    time.sleep(0.2)
    pyautogui.keyUp('enter')
    time.sleep(2)
    pyautogui.hotkey('ctrl','w')
    time.sleep(0.2)
    pyautogui.hotkey('right')
    time.sleep(0.2)
    pyautogui.hotkey('enter')
    time.sleep(0.2)
    pyautogui.hotkey('alt','tab')
    time.sleep(0.2)



def copyPht():
    pyautogui.keyDown('ctrl')
    pyautogui.keyDown('c')
    time.sleep(0.3)
    




    
#Python bot:
#Move mouse on X position (picture) [i], Y position [j], copy (ctrl c), drag to taskbar, (((//sort all photos, between vertical and horizontal))
#Paste photo, top of screen), press export, press save, press ctrl a, delete, and name with [i]
#Apasa pe save, revino la pozitia 2 X, poz 1 Y, daca poz X >16,poz x=1 Continua algoritm pana la 163

for i in range(len(xValues)-1,len(xValues),1):
    for j in range(0, len(yValues),1):
        x1=xValues[i]
        y1=yValues[j]
        #click(x1,y1)
        
        if keyboard.is_pressed('l') == True:
            break
        #copyPht()
        drag(x1,y1)
    
        if keyboard.is_pressed('l') == True:
                break
        
    if keyboard.is_pressed('l') == True:
                break



"""

while not keyboard.is_pressed('l') == True:
    x,y=win32api.GetCursorPos()
    #click(x,y)
    print(x)
    print(", ")
    print(y)
    time.sleep(0.1)
    
"""
"""
while not keyboard.is_pressed('l') == True:
    print(win32api.GetCursorPos())
    time.sleep(0.5)

    
"""