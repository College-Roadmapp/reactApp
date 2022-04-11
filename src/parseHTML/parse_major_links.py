import requests
import json
from bs4 import BeautifulSoup

# ------------------------- URL -------------------------
# URL BASE = https://catalog.oregonstate.edu/college-departments/
# ATTRS 1 = $college_name
# ATTRS 2 = $major_name
# ATTRS 3 = $program_name
# ATTRS 4 = #requirementstext
url = "https://catalog.oregonstate.edu/college-departments/"

# ------------------------- Parse -------------------------
# GET HTML File and Parse in BeautifulSoup
r = requests.get(url)
soup = BeautifulSoup(r.content, 'html.parser')
majors = soup.find("div", attrs={"sitemap"})
links_text = []


# ------------------------- Parse -------------------------
# GET HTML File and Parse in BeautifulSoup
def get_url():
    for a in majors.find_all("a", href=True, text=True):
        links_text.append({"link": "https://catalog.oregonstate.edu" + a["href"] + "#requirementstext", "major": a.text})


# Write to Json file
def generate_major_json():
    jsonString = json.dumps(links_text, indent=4)
    jsonFile = open("All_Majors_links.json", "w")
    jsonFile.write(jsonString)
    jsonFile.close()


# Call
get_url()
generate_major_json()
