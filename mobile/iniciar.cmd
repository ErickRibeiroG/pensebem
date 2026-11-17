@echo off
rem Inicia o app usando o Node 22 portatil (o Expo SDK 58 exige Node 22.13+).
rem Uso: iniciar.cmd          -> abre o menu do Expo (QR code para o Expo Go)
rem      iniciar.cmd --web    -> abre direto no navegador
set "PATH=%USERPROFILE%\node22;%PATH%"
cd /d "%~dp0"
if not exist node_modules call npm install
npx expo start %*
