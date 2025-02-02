from django.shortcuts import render
import requests 
from django.conf import settings
from django.contrib.auth import login
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views import View
from django.contrib import messages

# Create your views here.
AUTH_API_BASE_URL = 'http://127.0.0.1:8000/users/'

class SignupView(View):
    def get(self, request):
        return render(request, 'signup.html')

    def post(self, request):
        data = {
            "username": request.POST.get("username"),
            "email": request.POST.get("email"),
            "password": request.POST.get("password"),
        }
        response = requests.post(f'{AUTH_API_BASE_URL}/register/', json=data)
        print(response)
        print(data)

        if response.status_code == 201:
            messages.success({"message": "Signup successful. Welcome champ."})
            return redirect('login')

        else:
            messages.error(request, "Signup failed! Try again!")
            return render(request, 'signup.html')
        

class LoginView(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        """Authenticate users via existing auth and store token."""
        data = {
            "email": request.POST.get("email"),
            "password": request.POST.get("password"),
        }
        response = requests.post(f"{AUTH_API_BASE_URL}/login/token/", json=data)
        print(response)

        if response.status_code == 200:
            token = response.json().get("token")
            request.session["auth_token"] = token # store token in session
            messages.success(request, 'Login successful!')
            return redirect('dashboard')
        else:
            messages.error(request, 'Invalid credentals! Try again!')
            return render(request, 'login.html')