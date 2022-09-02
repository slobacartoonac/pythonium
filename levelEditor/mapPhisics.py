import pygame
import math
import random
import json


from Tkinter import Tk
from tkFileDialog import askopenfilename

Tk().withdraw() # we don't want a full GUI, so keep the root window from appearing
file_path = askopenfilename() # show an "Open" dialog box and return the path to the selected file
print(file_path)


# Initialize the game engine
pygame.init()

def distance(a,b):
    return math.sqrt((a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1]))
def neer(a,b,numb):
    return (numb<math.sqrt((a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1])+(a[2]-b[2])*(a[2]-b[2])))
 
# Define the colors we will use in RGB format
BLACK = (  0,   0,   0)
WHITE = (255, 255, 255)
BLUE =  (  0,   0, 255)
GREEN = (  0, 255,   0)
RED =   (255,   0,   0)
conections=[]
vertices=[]
triangles=[]
def save_state():
    towrite="{\"vertices\":"+str(json.JSONEncoder().encode(vertices))+",\"conections\":"+str(json.JSONEncoder().encode(conections))+",\"triangles\":"+ str(json.JSONEncoder().encode(triangles))+"}"
    f=open("objectF.json","w")
    f.write(towrite)
    print "writen: " +towrite


def addIfNot(a,b,c):
    toAd=True
    row=[a,b,c]
    minv=row[0]
    maxv=row[0]
    srv=row[0]
    for i in xrange(1,3,1):
        if(row[i]>maxv):
            maxv=row[i]
        if(row[i]<minv):
            minv=row[i]

    for tv in row:
        if tv!=maxv and tv!=minv:
            srv=tv
    if (minv,srv,maxv) in triangles:
        toAd=False
    if(toAd):triangles.append((minv,srv,maxv))
        
    

def computeTriangles():
    while len(triangles):triangles.pop()
    for i in xrange(len(vertices)):
        first=[]
        second=[]
        
        for (ca,cb) in conections:
            if ca==i:
                first.append((i,cb))
            if cb==i:
                first.append((i,ca))
        for (ca,cb) in conections:
            for (st,c1) in first:
                if c1==ca and cb!=st:
                    second.append((st,c1,cb))
                if c1==cb and ca!=st:
                    second.append((st,c1,ca))
        for (ca,cb) in conections:
            for (st,c1,c2) in second:
                if c2==ca and st==cb:
                    addIfNot(st,c1,c2)
                if c2==cb and st==ca:
                    addIfNot(st,c1,c2)
        print "triangles " +str(len(triangles))
                    
        

def neerest(tv):
    minv=-1
    mini=-1
    tei=0;
    for v in vertices:
        test=distance(tv,v)
        if test<minv or minv==-1:
            minv=test
            mini=tei
        tei+=1
    return minv,mini
    
def test(first, second):
    dit2=distance((first),(second))
    if dit2<10:
        fv,fi=neerest((first))
        if fv<10 and fv>-1:
            ln=len(vertices)
            for x in xrange(ln):
                vert=vertices.pop(0)
                if x!=fi: vertices.append(vert)
            lc=len(conections)
            for x in xrange(lc):
                (ca,cb)=conections.pop(0)
                if ca!=fi and cb!=fi:
                    conections.append((ca if ca<fi else ca-1,cb if cb<fi else cb-1))
        computeTriangles()
        return
    else:
        fv,fi=neerest((first))
        sv,si=neerest((second))
        if fv>10 or fv==-1:
            vertices.append((first))
            fi=len(vertices)-1
            print 'new vertice'+ str(fi)
        if sv>10 or sv==-1:
            vertices.append((second))
            si=len(vertices)-1
            print 'new vertice'+str(si)
        conections.append((fi,si))
        computeTriangles()
    return
    
 
# Set the height and width of the screen
img=pygame.image.load(file_path) 
size = img.get_rect().size;
screen = pygame.display.set_mode(size)
 
pygame.display.set_caption("Physics editor")
 
#Loop until the user clicks the close button.
pos= 0,0
mouse_pos=0,0


drawing=False
done = False
clock = pygame.time.Clock()
while not done:
 
    # This limits the while loop to a max of 10 times per second.
    # Leave this out and we will use all CPU we can.
    clock.tick(10)
     
    for event in pygame.event.get(): # User did something
        if event.type == pygame.QUIT: # If user clicked close
            done=True # Flag that we are done so we exit this loop
        if event.type == pygame.MOUSEMOTION:
            mouse_pos = mouse_x, mouse_y = pygame.mouse.get_pos()

        if event.type == pygame.MOUSEBUTTONDOWN:
            pos=pygame.mouse.get_pos()
            drawing=True

        if event.type == pygame.MOUSEBUTTONUP:
            drawing=False
            test(pos,pygame.mouse.get_pos())
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_RETURN:
                save_state()

 
    # All drawing code happens after the for loop and but
    # inside the main while done==False loop.
     
    # Clear the screen and set the screen background
    screen.fill((140,140,140))
    for a in xrange(0,img.get_rect().size[0],40):
        for b in xrange(0,img.get_rect().size[1],40):
            pygame.draw.rect(screen, (170,170,170), [a, b, 20, 20])
    for a in xrange(20,img.get_rect().size[0],40):
        for b in xrange(20,img.get_rect().size[1],40):
            pygame.draw.rect(screen, (170,170,170), [a, b, 20, 20])
    
 

    
    
    
    screen.blit(img,(0,0))
    for z in triangles:
        pygame.draw.polygon(screen, RED, [vertices[z[0]],vertices[z[2]],vertices[z[1]]], 6)
        
        
    for x in conections:
        pygame.draw.line(screen, WHITE, vertices[x[0]], vertices[x[1]], 4)
        pygame.draw.line(screen, GREEN, vertices[x[0]], vertices[x[1]], 2)
    for y in vertices:
        pygame.draw.circle(screen, WHITE, y, 4,2)
        pygame.draw.circle(screen, BLUE, y, 5,2)
    
    if(drawing):
        pygame.draw.line(screen, WHITE, (mouse_pos), (pos), 4)
        pygame.draw.line(screen, RED, (mouse_pos), (pos), 2)

            
    pygame.display.flip()
 
# Be IDLE friendly
pygame.quit()
