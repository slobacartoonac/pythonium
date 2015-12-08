import Tkinter as tk
import ttk
import recorder_main
import re
#most of this code is writen by slobacartoonac@hotmail.com

#not this function
def parsegeometry(geometry):
    m = re.match("(\d+)x(\d+)([-+]\d+)([-+]\d+)", geometry)
    if not m:
        raise ValueError("failed to parse geometry string")
    return map(int, m.groups())

class Example(tk.Tk):
    def __init__(self):
        tk.Tk.__init__(self)
        self.title("tiny screen recorder 4 free")
        self.duration=tk.StringVar()
        self.framerate=tk.IntVar()
        labela="set recording time"
        self.sound = tk.StringVar()
        self.duration.set("10")
        self.framerate.set(24)
        self.sound.set("sound")
        #
        self.floater = FloatingWindow(self)
        #
        self.mainframe = ttk.Frame(self, padding="10 10 22 22")
        self.mainframe.grid(column=0, row=0, sticky=('N', 'W', 'E', 'S'))
        self.mainframe.columnconfigure(0, weight=1)
        self.mainframe.rowconfigure(0, weight=1)
        ttk.Button(self.mainframe, text="Record", command=self.recordVideo).grid(column=3, row=4,sticky=('E'))
        ttk.Label(self.mainframe, text="set recording time \nin seconds[s]").grid(column=3, row=1, sticky=( 'E'))
        feet_entry = ttk.Entry(self.mainframe, width=7, textvariable=self.duration)
        feet_entry.grid(column=3, row=2, sticky=('W', 'E'))
        ttk.Label(self.mainframe, text="set framerate\n[24,1] fps").grid(column=1, row=1, sticky=( 'E'))
        ttk.Label(self.mainframe, text=" * ").grid(column=2, row=2, sticky=( 'E'))
        feet_entry1 = ttk.LabeledScale(self.mainframe, from_=24, to=1,variable=self.framerate)
        feet_entry1.grid(column=1, row=2, sticky=('W', 'E'))
        check = ttk.Checkbutton(self.mainframe, text='Record sound', command=None, variable=self.sound,
	    onvalue='sound', offvalue='mute')
        check.grid(column=1, row=4, sticky=('W', 'E'))
    def recordVideo(self):
        self.title("RECORDING "+str(self.duration.get())+"s "+str(self.framerate.get())+"fps "+self.floater.geometry()+" "+self.sound.get())
        self.floater.attributes("-alpha", 0.0)
        self.attributes("-alpha", 0.0)
        try:
            recorder_main.record(int(self.duration.get()), round(self.framerate.get()), parsegeometry(self.floater.geometry()),self.sound.get()=="sound")
        except:
            self.title("RECORDING FAILD");
        self.attributes("-alpha", 1.0)
        self.floater.attributes("-alpha", 0.8)
        return

class FloatingWindow(tk.Toplevel):
    def __init__(self, *args, **kwargs):
        tk.Toplevel.__init__(self, *args, **kwargs)
        self.overrideredirect(True)
        self.wm_geometry("400x400")
        self.label=("400","400")
        self.attributes("-alpha", 0.8)
        self.label = tk.Label(self, text="Recording area")
        self.label.pack(side="bottom", fill="both", expand=True)

        self.grip = ttk.Sizegrip(self)
        self.grip.place(relx=1.0, rely=1.0, anchor="se")
        self.grip.lift(self.label)
        self.grip.bind("<B1-Motion>", self.OnMotion)
        
        self.label.bind("<B1-Motion>", self.OnMotion1)

    def OnMotion(self, event):
        #x1 = self.winfo_pointerx()
        #y1 = self.winfo_pointery()
        #x0 = self.winfo_rootx()
        #y0 = self.winfo_rooty()
        #print x1,y1,x0,y0
        #self.label=(str(int(x1-x0)),str(int(y1-y0)))
        #self.geometry("%sx%s" % ((x1-x0),(y1-y0)))
        return
    def OnMotion1(self, event):
        x1 = self.winfo_pointerx()
        y1 = self.winfo_pointery()
        x0 = self.winfo_rootx()
        y0 = self.winfo_rooty()
        info=parsegeometry(self.geometry())
        #print self.geometry()
        self.geometry("%sx%s+%s+%s" % ((info[0]),(info[1]),(x1),(y1)))
        return

app=Example()
app.mainloop()
