# TO-DO:
# ADD: LEDS to shine when taking picture

from tkinter import *
import tkinter.font
from picamera import PiCamera
from time import sleep
from datetime import datetime

myCamera = PiCamera()
myWin = Tk()
myFont = tkinter.font.Font(family="Ubuntu", size=14, weight="bold")

# Add Title:
myWin.title("P-CASO Cell Scanner")

# Add Events:
def onPreview():
    myCamera.start_preview(fullscreen=False, window=(80,20,720,720))
    # previewButton["text"]="Preview: ON"

def offPreview():
    myCamera.stop_preview()
    # exitPreviewButton["text"]="Preview: OFF"

def captureImage():
    filename = datetime.now().strftime("%d-%m-%Y-%H-%M-%S")
    sleep(3)
    myCamera.capture("/home/pi/Pictures/prostateSlides/"+filename+".jpg")
    offPreview()

def exitWindow():
    offPreview()
    myWin.destroy()

# Add Widgets:
previewButton = Button(myWin, text="Preview ON", font=myFont, command=onPreview, bg="bisque2", height=1, width=24)
previewButton.grid(row=0, column=1)

exitPreviewButton = Button(myWin, text="Preview OFF", font=myFont, command=offPreview, bg="bisque2", height=1, width=24)
exitPreviewButton.grid(row=2, column=1)

captureButton = Button(myWin, text="Capture", font=myFont, command=captureImage, bg="bisque2", height=1, width=24)
captureButton.grid(row=4, column=1)

exitButton = Button(myWin, text="Exit", font=myFont, command=exitWindow, bg="red", height=1, width=12)
exitButton.grid(row=6, column=1)

myWin.protocol("WM_DELETE_WINDOW", exitWindow)
myWin.mainloop()

