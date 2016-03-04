from json import load
from urllib2 import urlopen
import time
import subprocess
#include myip.js to your solution and req your ip with 'my_ip_var'


my_old=""
my_user="username"
my_pass="pass"#if special characters then url codes
my_repo="github.com/username/repository.git"
while 1:
    my_ip = load(urlopen('https://api.ipify.org/?format=json'))['ip']#get your public ip
    if(my_ip!=my_old):#only if ip is changed
        print my_ip
        f=open('myip.js','w');
        f.write('var my_ip_var=\''+my_ip+'\';')#write your new ip to file
        my_old=my_ip
        f.close()
        p = subprocess.Popen(
        	'git commit myip.js -m '+my_old,shell=True,stdout=subprocess.PIPE,
                stdin=subprocess.PIPE)#commit new file
        for line in p.stdout.readlines():
            print line
        p.stdin.close()
        retval = p.wait()
        proc = subprocess.Popen(
            'git push --repo https://'+my_user+':'+my_pass+'@'+my_repo,shell=True,stdout=subprocess.PIPE,
            stdin=subprocess.PIPE)#push file to git repository
        for line in proc.stdout.readlines():
            print line
        proc.stdin.close()
        print proc.wait()

        
    time.sleep(180);#check every 3 minutes
