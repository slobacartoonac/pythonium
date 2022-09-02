import pygame
import json
pygame.init()

size = width, height = 600,600
window = pygame.display.set_mode(size)
pygame.display.set_caption( "KeyGame editor v1" )

clock = pygame.time.Clock()
fps = 60
gridsize=25
to_draw=[[0 for x in range(gridsize)] for x in range(gridsize)] 
current_color = 1
draw_start = False


font = pygame.font.Font(None, 36)
def show_text(msg,color,x,y):
    myfont = pygame.font.SysFont("monospace", 20)
    text = myfont.render(msg, 1, color)
    textpos = (x,y)
    window.blit(text,textpos)

def game_save():
    file = open('level.txt', 'w')
    for row in to_draw:
        file.write("[,")
        for el in row:
            file.write(str(int(el))+",")
        file.write("],\n")
    file.close()
    with open('level.html', 'w') as outfile:
        outfile.write('<html><head><title>Pythonium Test</title></head><body>  <a href="https://slobacartoonac.github.io/pythonium/keyGameSandBoxAI/index.html#');
        jsencode=json.dumps(to_draw,separators=(',',':'))
        outfile.write(jsencode.replace('[','a').replace(']','b').replace(',','c'))
        outfile.write('">Your Level</a></br></body></html>');
def game_load():
    ii=0
    jj=0
    with open('level.txt', 'r') as myfile:
        data=myfile.read().replace('\n', '')
        tokens=data.split(",");
        for tok in tokens:
            if tok==']':
                jj+=1;
            elif tok=='[':
                ii=0;
            elif tok=='':
                ii=ii;
            else:
                try:
                    to_draw[jj][ii]=int(tok)
                except:
                    ii=ii
                ii+=1;
mouse_x, mouse_y = 0, 0

running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

        if event.type == pygame.MOUSEMOTION:
            mouse_pos = mouse_x, mouse_y = pygame.mouse.get_pos()

        if event.type == pygame.MOUSEBUTTONDOWN:
            pos=pygame.mouse.get_pos()

        if event.type == pygame.MOUSEBUTTONUP:
            if int((pos[1]-50)/20) in range(gridsize) and int((pos[0]-50)/20) in range(gridsize):
                if to_draw[int((pos[1]-50)/20)][int((pos[0]-50)/20)]==current_color:
                    to_draw[int((pos[1]-50)/20)][int((pos[0]-50)/20)]=0
                else:
                    to_draw[int((pos[1]-50)/20)][int((pos[0]-50)/20)]=current_color;
            else:
                if pos[1] in range(7,33): #(22+25*current_color,7),(24, 2)
                    new_color=int((pos[0]-22)/25)
                    if new_color in range(1,12):
                        current_color=new_color
                elif pos[1] in range(60+20*gridsize,85+20*gridsize):
                    # 60+180 260+80
                    if pos[0] in range(60,240):
                        game_save()
                    elif pos[0] in range(260,340):
                        game_load()
                    
            


        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
            #if event.key == pygame.K_LEFT:
            #    current_color += 1
            #if event.key == pygame.K_RIGHT:
            #    current_color -= 1
            
            iy=50
            if event.key == pygame.K_RETURN:
                game_save()
                
            if event.key == pygame.K_BACKSPACE:
                game_load()
                
                            
                    
    window.fill(pygame.Color('gray'))

    iy=50
    for row in to_draw:
        ix=50
        for el in row:
            if el==1:
                pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((ix,iy),(19, 19)))
            elif el==2:
                pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((ix+5,iy),(10, 19)))
            elif el==3:
                pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((ix+5,iy),(10, 19)))
            elif el==4:
                pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((ix,iy),(19, 19)))
            elif el==5:
                pygame.draw.rect(window,pygame.Color('blue'),pygame.Rect((ix+5,iy),(10, 19)))
            elif el==6:
                pygame.draw.rect(window,pygame.Color('blue'),pygame.Rect((ix,iy),(19, 19)))
            elif el==7:
                pygame.draw.rect(window,pygame.Color('green'),pygame.Rect((ix+5,iy),(10, 19)))
            elif el==8:
                pygame.draw.rect(window,pygame.Color('green'),pygame.Rect((ix,iy),(19, 19)))
            elif el==9:
                pygame.draw.rect(window,pygame.Color('yellow'),pygame.Rect((ix,iy),(19, 19)))
            elif el==10:
                pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((ix+2,iy+2),(5, 5)))
                pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((ix+12,iy+2),(5, 5)))
                pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((ix+2,iy+12),(5, 5)))
                pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((ix+7,iy+7),(5, 5)))
                pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((ix+12,iy+12),(5, 5)))
            ix+=20;
        iy+=20;

    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((50,10),(19, 19)))

    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((80,10),(10, 19)))

    pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((105,10),(10, 19)))

    pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((125,10),(19, 19)))

    pygame.draw.rect(window,pygame.Color('blue'),pygame.Rect((155,10),(10, 19)))

    pygame.draw.rect(window,pygame.Color('blue'),pygame.Rect((175,10),(19, 19)))

    pygame.draw.rect(window,pygame.Color('green'),pygame.Rect((205,10),(10, 19)))

    pygame.draw.rect(window,pygame.Color('green'),pygame.Rect((225,10),(19, 19)))

    pygame.draw.rect(window,pygame.Color('yellow'),pygame.Rect((250,10),(19, 19)))

    pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((277,12),(5, 5)))
    pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((287,12),(5, 5)))
    pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((277,22),(5, 5)))
    pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((282,17),(5, 5)))
    pygame.draw.rect(window,pygame.Color('red'),pygame.Rect((287,22),(5, 5)))

    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((22+25*current_color,7),(24, 2)))
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((22+25*current_color,7),(2, 24)))
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((45+25*current_color,7),(2, 24)))
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((22+25*current_color,30),(25, 2)))

    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((47,47),(20*gridsize+5, 2)))
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((47,47),(2, 20*gridsize+5)))
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((50+20*gridsize,47),(2, 20*gridsize+5)))
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((47,50+20*gridsize),(20*gridsize+5, 2)))


    show_text("x: "+str(int((mouse_x-50)/20))+"  y: "+str(int((mouse_y-50)/20)),pygame.Color('red'), 400,0)
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((50,60+20*gridsize),(180, 25)))
    pygame.draw.rect(window,pygame.Color('black'),pygame.Rect((250,60+20*gridsize),(80, 25)))
    show_text("save/export",pygame.Color('red'), 60,60+20*gridsize)
    show_text("load",pygame.Color('red'), 260,60+20*gridsize)
    
    if current_color==1:
        show_text("Brick",pygame.Color('red'),400,20)
    elif current_color==2:
        show_text("Player-start",pygame.Color('red'),400,20)
    elif current_color==3:
        show_text("red key",pygame.Color('red'),400,20)
    elif current_color==4:
        show_text("red door",pygame.Color('red'),400,20)
    elif current_color==5:
        show_text("blue key",pygame.Color('red'),400,20)
    elif current_color==6:
        show_text("blue door",pygame.Color('red'),400,20)
    elif current_color==7:
        show_text("green key",pygame.Color('red'),400,20)
    elif current_color==8:
        show_text("green door",pygame.Color('red'),400,20)
    elif current_color==9:
        show_text("King-goal",pygame.Color('red'),400,20)
    elif current_color==10:
        show_text("Shark-enemy",pygame.Color('red'),400,20)
    elif current_color==11:
        show_text("Brick",pygame.Color('red'),400,20)


    pygame.display.update()
    clock.tick(fps)


pygame.quit()
