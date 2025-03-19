from django.shortcuts import render

def home(request):
    return render(request, 'base.html')
def soms(request):
    return render(request, 'users/login.html')
