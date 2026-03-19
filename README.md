# BDD UI Automation Framework for SauceDemo
Welcome to the BDD UI automation test framework for https://www.saucedemo.com/
This framework is designed to support scalable, maintainable, and fast UI test automation using modern tools and best practices.

# Tech Stack
The framework is built using the following tools and technologies:
•	Node.js – JavaScript runtime environment
•	Playwright – Browser automation library for end-to-end testing
•	TypeScript – Strongly typed scripting language
•	Jest-Cucumber – BDD (Behavior-Driven Development) framework
•	Jest – Test runner and assertion library
# Key Features
•	✅ BDD-style test scenarios using Gherkin syntax
•	✅ Page Object Model (POM) design pattern for better maintainability
•	✅ Reusable and modular code structure
•	✅ Automatic screenshot capture for debugging
•	✅ Video recording of test execution
•	✅ Cucumber-style HTML test reporting
•	✅ Cross-browser testing support, including:
o	Firefox
o	Chrome
o	Microsoft Edge
o	WebKit (Safari engine)
o	Chromium

# Setup and Run Instructions
1.	Clone the repository:
•	git clone <repository-url>
•	Open Visual Studio Code and cd <project-folder>

2.	Install dependencies
npm install

3.	Running Tests
•	Run all tests
      npm run test
•	Run a single specific testtest
      npm run test -- -t "<Scenario Name> “i.e. “Checkout with one item”

# Test Artifacts
After execution, the following artifacts are generated:
•	reports/screenshots/ → Screenshots for debugging
•	reports/videos/ → Recorded test execution videos
•	reports/html/ → Cucumber-style HTML reports

# Further Reading
•	Playwright Documentation: https://playwright.dev/
•	 Cucumber Documentation: https://cucumber.io/


