import requests
import json
from bs4 import BeautifulSoup

# ------------------------- URL -------------------------
# URL BASE = https://catalog.oregonstate.edu/college-departments/
# ATTRS 1 = $college_name
# ATTRS 2 = $major_name
# ATTRS 3 = $program_name
# ATTRS 4 = #requirementstext

# CASE OF Computer Science Undergraduate Major (BA, BS, HBA, HBS)
url = "https://catalog.oregonstate.edu/college-departments/engineering/school-electrical-engineering-computer-science" \
      "/computer-science-ba-bs-hba-hbs/#requirementstext "

# CASE OF Agricultural Sciences Undergraduate Major (BS, HBS)
# url = "https://catalog.oregonstate.edu/college-departments/agricultural-sciences/agricultural-education-general" \
#       "-agriculture/agricultural-sciences-bs-hbs/#requirementstext "

# ------------------------- Parse -------------------------
# GET HTML File and Parse in BeautifulSoup
r = requests.get(url)
soup = BeautifulSoup(r.content, 'html.parser')
courses = soup.find("table", attrs={"class": "sc_courselist"}).tbody.find_all("tr")
coursesList = []


# Print to console
def get_course():
    for course in courses:
        try:
            code = course.find("td", attrs={"class": "codecol"}).a.text
            title = course.find("td", attrs={"class": "codecol"}).next_sibling.text.strip()
            coursesList.append({"code":code,"title":title})
        except:
            continue


# Write to Json file
def generate_course_json():

    jsonString = json.dumps(coursesList, indent=4)
    jsonFile = open("data.json", "w")
    jsonFile.write("{" + "\"" + "$program_name" + "\"" + ":")
    jsonFile.write(jsonString)
    jsonFile.write("}")
    jsonFile.close()


get_course()
generate_course_json()
