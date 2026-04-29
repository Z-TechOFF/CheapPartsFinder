import requests

query = input("Қандай компьютер запчасть іздейсіз? ")

url = f"https://dummyjson.com/products/search?q={query}"
response = requests.get(url)
data = response.json()

products = data["products"]

if len(products) == 0:
    print("Тауар табылмады")
else:
    cheapest = min(products, key=lambda product: product["price"])

    print("\nЕң арзан тауар:")
    print("Атауы:", cheapest["title"])
    print("Бағасы:", cheapest["price"], "$")
    print("Сипаттамасы:", cheapest["description"])