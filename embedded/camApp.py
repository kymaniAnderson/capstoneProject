# TO-DO:
# ADD: LEDS to shine when taking picture

from tkinter import *
import tkinter.font
from picamera import PiCamera
from time import sleep

myCamera = piCamera()
myWin = Tk()
myFont = tkinter.font.Font(family="Ubuntu", size=14, weight="bold")

state = 1

# Add Title:
myWin.title("P-CASO Cell Scanner")

# Add Events:
def togglePreview():
    state = state + 1

    if (state%2) == 0:
        myCamera.start_preview()
        previewButton["text"]="Preview: ON"
    else:
        myCamera.stop_preview()
        previewButton["text"]="Preview: OFF"

def captureImage():
    sleep(5)
    myCamera.capture("/home/prostateSlides/image.jpg")

def exitWindow():
    myWin.destroy()

# Add Widgets:
previewButton = Button(myWin, text="Preview: OFF", font=myFont, command=togglePreview, bg="bisque2", height=1, width=24)
previewButton.grid(row=0, column=1)

captureButton = Button(myWin, text="Capture", font=myFont, command=captureImage, bg="bisque2", height=1, width=24)
captureButton.grid(row=2, column=1)

exitButton = Button(myWin, text="Exit", font=myFont, command=exitWindow, bg="red", height=1, width=12)
exitButton.grid(row=4, column=1)

myWin.protocol("WM_DELETE_WINDOW", exitWindow)
myWin.mainloop()