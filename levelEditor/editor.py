import pygame
import json
pygame.init()

size = width, height = 600,600
window = pygame.display.set_mode(size)
pygame.display.set_caption( "KeyGame editor v1" )

clock = pygame.time.Clock()
fps = 60

to_draw=[[0 for x in range(25)] for x in range(25)] 
current_color = 0
draw_start = False

##GRAMMATA##
font = pygame.font.Font(None, 36)
def show_text(msg,color,x,y):
    text = font.render(msg,True,color)
    textpos = (x,y)
    window.blit(text,textpos)
############


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
            try:
                to_draw[int((pos[1]-50)/20)][int((pos[0]-50)/20)]+=1;
                to_draw[int((pos[1]-50)/20)][int((pos[0]-50)/20)]%=10;
            except:
                i=5

        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_ESCAPE:
                running = False
            if event.key == pygame.K_LEFT:
                current_color += 1
            if event.key == pygame.K_RIGHT:
                current_color -= 1
            
            iy=50
            if event.key == pygame.K_RETURN:
                file = open('level.txt', 'w')
                for row in to_draw:
                    file.write("[,")
                    for el in row:
                        file.write(str(int(el))+",")
                    file.write("],\n")
                file.close()
                with open('level.html', 'w') as outfile:
                    outfile.write('<html><head><title>Pythonium Test</title></head><body>  <a href="http://slobacartoonac.github.io/pythonium/keyGameSandBox/index.html#');
                    json.dump(to_draw, outfile,separators=(',',':'))
                    outfile.write('">Your Level</a></br></body></html>');
            if event.key == pygame.K_BACKSPACE:
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
                            
                    
    window.fill(pygame.Color('gray'))

    if current_color not in [0,1,2,3,4]:
        current_color = 0
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
            ix+=20;
        iy+=20;


    show_text("x:",pygame.Color('red'), 300,0)
    show_text(str(int((mouse_x-50)/20)),pygame.Color('red'),350,0)
    show_text("y:",pygame.Color('red'),450,0)
    show_text(str(int((mouse_y-50)/20)),pygame.Color('red'),500,0)

    pygame.display.update()
    clock.tick(fps)


pygame.quit()
