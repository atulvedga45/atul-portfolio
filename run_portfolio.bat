@echo off
title Spider-Man Portfolio Launcher
echo ========================================================
echo        Spider-Man Portfolio Launcher - Atul Vedga
echo ========================================================
echo.

set PATH=C:\Program Files\nodejs;C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python314;C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python314\Scripts;%PATH%

echo Starting Python FastAPI Backend on http://127.0.0.1:8000 ...
start "Portfolio Backend (FastAPI)" cmd /k "cd /d %~dp0backend && python -m uvicorn main:app --reload --port 8000"

timeout /t 2 /nobreak > nul

echo Starting React Vite Frontend on http://localhost:5173 ...
start "Portfolio Frontend (React Vite)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers started!
echo Frontend: http://localhost:5173
echo Backend API Docs: http://127.0.0.1:8000/docs
echo.
pause
