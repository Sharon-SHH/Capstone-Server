import requests

url = "https://bing-search-apis.p.rapidapi.com/api/rapid/web_search"

querystring = {"keyword":"how-to-use-excel-for-free","page":"0","size":"30"}

headers = {
	"X-RapidAPI-Key": "3c40e8543bmsh29b3aaa30929b95p1fe054jsn6d01bd065bf6",
	"X-RapidAPI-Host": "bing-search-apis.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())