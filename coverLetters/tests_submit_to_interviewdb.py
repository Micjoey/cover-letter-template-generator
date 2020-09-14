from selenium.webdriver.common.action_chains import ActionChains
from django.test import TestCase
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait, Select
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from .models import Job, UserDetail
from django.core.exceptions import ValidationError
from selenium.webdriver.common.keys import Keys
from random_word import RandomWords
import time
from datetime import datetime


class FunctionalSubmitToInterviewDB(TestCase):

    def setUp(self):
        self.browser = webdriver.Chrome()

    def test_submitting_to_interviewdb(self):
        
        self.browser.get(
            'http://localhost:3000/cover-letter-generator/all-jobs/')
        wait = WebDriverWait(self.browser, 20)
        
        # todaysDate = datetime.now().strftime('%B %dth, %Y')
        allJobs = self.browser.find_elements_by_tag_name('a')
        i = 2
        while i < 110:
            print("current index -", i)
            currentJob = allJobs[i]
            currentJob.click()
            time.sleep(2)
            jobTitle = self.browser.find_element_by_id('job-title').text
            jobCompany = self.browser.find_element_by_id('job-company').text
            jobWebsite = self.browser.find_element_by_id('job-website').text
            jobDetails = self.browser.find_element_by_id(
                'job-company').text+'- '+self.browser.find_element_by_id('job-title').text + ' ('+self.browser.find_element_by_id('job-website').text+')'
            halfJobDetails = self.browser.find_element_by_id(
                'job-company').text+'- '+self.browser.find_element_by_id('job-title').text + ' ('
            self.browser.get('https://www.interview-db.com/')
            signInText = None
            if i == 2:
                signInText = self.browser.find_element_by_link_text(
                    'Student Sign in with Github')
            if signInText:
                self.browser.find_element_by_link_text(
                    'Student Sign in with Github').click()
                self.browser.find_element_by_id(
                    'login_field').send_keys('Micjoey')
                self.browser.find_element_by_id(
                    'password').send_keys('v2CAMjBdOf1lQ09DoIXuQ')
                self.browser.find_element_by_class_name(
                    'btn-block').click()
                wait.until(EC.url_changes(self.browser))
                print('signed in')
                self.browser.get('https://www.interview-db.com/profile')
                reportLink = self.browser.find_element_by_css_selector(
                    '#root > section > div > nav > a:nth-child(1)')
                reportLink.click()
                self.browser.find_element_by_css_selector('#react-tabs-2').click()
                time.sleep(10)
            self.browser.get('https://www.interview-db.com/profile')
            self.browser.find_element_by_xpath(
                '//*[@id="root"]/section/div/main/nav/nav/button[3]').click()
            print('go back to interview-db-job-search')
            wait.until(
                EC.element_to_be_clickable((By.TAG_NAME, 'li')))
            print('click on all activity')
            self.browser.find_element_by_tag_name('input').clear()
            self.browser.find_element_by_tag_name('input').send_keys('365')
            print('enter search day')
            time.sleep(10)
            fullTitleIsPresent = self.browser.page_source.find(
                jobDetails) != -1
            halfTitleIsPresent = halfJobDetails in self.browser.page_source
            print(fullTitleIsPresent," -", jobDetails)
            if not fullTitleIsPresent or not halfTitleIsPresent:
                print('in NOT present if clause')
                self.browser.find_element_by_xpath('//*[@id="root"]/section/div/nav/a[1]').click()
                print('click on report')
                wait.until(EC.invisibility_of_element((By.CLASS_NAME, 'sc-lcpuFF eOXROa')))
                print('clear clickable wait for li')
                # time.sleep(10)
                # self.browser.find_element_by_xpath('/html/body/main/section/div/div/div/div/ul/li[2]').click()
                # print('click on job search updates')
                if wait.until(EC.element_to_be_clickable((By.CLASS_NAME, 'btn-add'))):
                    print("clear btn wait")
                    self.browser.find_elements_by_class_name('btn-add')[5].click()
                    print('clicked button')
                    # find the Job Title input field
                    title = self.browser.find_element_by_id(
                        'root_applications_0_jobTitle')
                    title.click()
                    title.send_keys(
                        jobTitle)
                    #
                    # find the company field and create it or select
                    actions = ActionChains(self.browser)
                    companyButton = self.browser.find_elements_by_class_name(
                        'css-1hwfws3')[0]
                    actions.click(companyButton)
                    actions.send_keys(
                        jobCompany)
                    actions.pause(2)
                    # actions.send_keys(Keys.UP)
                    actions.send_keys(Keys.ENTER)
                    # actions.send_keys(Keys.TAB)
                    actions.perform()
                    actions.reset_actions()
                    #
                    # find the link
                    # find the source field and create or select
                    sourceButton = self.browser.find_elements_by_class_name(
                        'css-1hwfws3')[1]
                    actions = ActionChains(self.browser)    
                    actions.reset_actions()
                    actions.click(sourceButton)
                    actions.send_keys(
                        jobWebsite)
                    actions.pause(2)
                    # actions.send_keys(Keys.UP)
                    actions.send_keys(Keys.ENTER)
                    actions.perform()
                    actions.reset_actions()
                    #
                self.browser.find_elements_by_tag_name('button')[9].click()
                print('submit job')
                wait.until(EC.url_matches(
                    'https://www.interview-db.com/profile/job-search'))
                # time.sleep(10)
            print('break from if clause')
            self.browser.get(
                'http://localhost:3000/cover-letter-generator/all-jobs/')
            allJobs = self.browser.find_elements_by_tag_name('a')
            i += 2
                

    def tearDown(self):
        self.browser.quit()


