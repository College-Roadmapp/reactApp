import requests
import json
from bs4 import BeautifulSoup


# Get course code and title
def get_course():
    Length = len(soup.find_all("table", attrs={"class": "sc_courselist"}))

    for i in range(0, Length):
        table = tables[i]
        courses = table.tbody.find_all("tr")

        for course in courses:
            try:
                code = course.find("td", attrs={"class": "codecol"}).a.text
                title = course.find("td", attrs={"class": "codecol"}).next_sibling.text.strip().split("and")[0]
                coursesList.append({"code": code, "title": title})

                code1 = course.find("span", attrs={"class": "blockindent"}).a.text
                title1 = course.find("td", attrs={"class": "codecol"}).next_sibling.span.text.strip().split("and ")[1]
                coursesList.append({"code":code1,"title":title1})

                code2 = course.find("span", attrs={"class": "blockindent"}).next_sibling.next_sibling.a.text
                title2 = course.find("td", attrs={"class": "codecol"}).next_sibling.span.next_sibling.next_sibling.text.strip().split("and ")[1]
                coursesList.append({"code":code2,"title":title2})

            except:
                continue


# Write to Json file
def generate_course_json(major):
    jsonString = json.dumps(coursesList, indent=4)
    fileName = major + ".json"
    jsonFile = open(fileName, "w")
    jsonFile.write("{" + "\"" + "Courses" + "\"" + ":")
    jsonFile.write(jsonString)
    jsonFile.write("}")
    jsonFile.close()


# URL
# URL BASE = https://catalog.oregonstate.edu/college-departments/
# ATTRS 1 = $college_name
# ATTRS 2 = $major_name
# ATTRS 3 = $program_name
# ATTRS 4 = #requirementstext
f = open("Undergraduate_Majors_Links.json")
major_links = json.load(f)

# Parse all major courses with link & major, and generate json file
for num in range(0, len(major_links)):
    link = major_links[num]["link"]
    print(link)
    major = major_links[num]["major"]
    print(major)

    # GET HTML File and Parse in BeautifulSoup
    r = requests.get(link)
    soup = BeautifulSoup(r.content, 'html.parser')
    tables = soup.find_all("table", attrs={"class": "sc_courselist"})
    coursesList = []

    # Call
    get_course()
    generate_course_json(major)
