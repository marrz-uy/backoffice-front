@echo off
echo "Ingrese el commit"
set /P Commit=
git add .
git commit -m%Commit%
git push
pause