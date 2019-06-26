import requests

api_url = 'http://127.0.0.1:5555'
resp = requests.get(api_url)
print(resp)