import requests
from bs4 import BeautifulSoup

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

# GET HTML File and Parse in BeautifulSoup
r = requests.get(url)
soup = BeautifulSoup(r.content, 'html.parser')

# Course ( Code, Title )
courses = soup.find("table", attrs={"class": "sc_courselist"}).tbody.find_all("tr")


# Print to console
def get_course():
    for course in courses:
        try:
            code = course.find("td", attrs={"class": "codecol"}).a.text
            title = course.find("td", attrs={"class": "codecol"}).next_sibling.text.strip()
            print(code, title, sep="\n")
            print("-" * 60)
        except:
            continue


get_course()
