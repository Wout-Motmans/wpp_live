(Windows) backend install guide

1: Install python 3.11.6 (https://www.python.org/downloads/windows/) --> download Windows installer
1.1 Run python.exe - add python to path in installation guide
1.2: Check if pyhton is installed succesfully: - in cmd: python -V --> Python 3.11.6
2: Install pip - in cmd: curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py - python get-pip.py
2.1 Check if pip is installed succesfully: - in cmd: pip -V --> pip 23.2.1
3: Install packages - in cmd:

- pip install django
- pip install procyclingstats
- pip install djangorestframework
- pip install psycopg2

4: in /Backend folder python manage.py runserver --> Ga naar http://127.0.0.1:8000/ en kijk of het werkt
