import json
f=open('test2.obj','r');
fs=open('to.json','w')
model={};
vertices=[];
normals=[];
uvs=[];
normals1=[];
uvs2=[];
indices=[];
p=0
for line in f:
    if(line[0]=='v'):
        if(line[1]==' '):
            li=line[2:-1]
            print li
            vertices+=li.split(' ')
        if(line[1]=='t'):
            li=line[3:-1]
            print li
            uvs+=li.split(' ')
        if(line[1]=='n'):
            li=line[3:-1]
            print li
            normals+=li.split(' ')
    if(line[0]=='f'):
            li=line[2:-1]
            #print li
            li1=li.split(' ')
            adl=[];
            adu=[];
            adn=[];
            for l in li1:
                ll=l.split('/')
                adl.append(int(ll[0])-1);
                adu.append(uvs[(int(ll[1])-1)*2])
                adu.append(uvs[(int(ll[1])-1)*2+1])
            print adu
            uvs2+=adu
            adl.insert(3,adl[2])
            adl.insert(3,adl[0])
            print adl
            indices+=adl
model['indices']=indices;    
model['vertices']=vertices;
print len(vertices);
print len(vertices)/3;
a = []
for i in range(0,len(indices)*2): a.append(0);

model['textcords']=uvs2;
model['colors']=a;
model['normals']=normals;

a=json.dumps(model)

fs.write(a)
