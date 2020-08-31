from django.test import TestCase
from selenium import webdriver
from .forms import CoverLetterForm



# class FunctionalTestCase(TestCase):
#     def setUp(self):
#         self.browser = webdriver.Chrome()


#     def test_there_is_homepage(self):
#         self.browser.get('http://localhost:3000')
#         self.assertIn('cover', self.browser.page_source)


#     def tearDown(self):
#         self.browser.quit()

class UnitTestCaste(TestCase):

    def test_home_homepage_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'homepage/homepage.html')

    def test_cover_letter_form(self):
        form = CoverLetterForm(data={
            'template_choices': 'Template 1',
            'company':'Test - company1',
            'city':'Test-  santa barbara',
            'title':'Test - Jackie',
            'link':'Test - www.trialone.com',
            'recruiter':'',
            'description':'Test - I love test cases',
            'pre_bullet_point_paragraph_one':'Test - paragraphone',
            'pre_bullet_point_paragraph_two':'Test - paragraphtwo',
            'top_skills':'Test - Javascript, Banana',
            'bullet_point_one':'Test - BP1',
            'bullet_point_two':'Test - BP2',
            'bullet_point_three':'Test - BP3',
            'bullet_point_four':'Test - BP4',
            'bullet_point_five':'Test - BP5',
            'bullet_point_six':'Test - BP6',
            'bullet_point_seven':'Test - BP7',
            'bullet_point_eight':'Test - BP8',
            'post_bullet_point_paragraph_one':'Test - paragraphpostone',
            'post_bullet_point_paragraph_two': 'Test - paragraphposttwo',
        })
        self.assertTrue(form.is_valid())

    def test_all_jobs_template(self):
        response = self.client.get('/cover-letter-generator/all-jobs')
        self.assertTemplateUsed(response, 'jobs/all-jobs.html')

    def test_all_users_template(self):
        response = self.client.get('/cover-letter-generator/all-users')
        self.assertTemplateUsed(response, 'users/all-users.html')

