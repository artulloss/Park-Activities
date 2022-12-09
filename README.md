# Final exam

Prompt

The final exam programming assignment will focus on creating a web “application” (interface) that will provide a user the ability to query an API. Your application will need to implement the following requirements:

- Usage of a web API approved per the Final Exam Proposal assignment. I suggest that you pick a well-documented API that
supports a JSON data format for easier JavaScript consumption.
- At least one web page that provides
a search field that a user can enter values to search for items in the API
- a result listing of the search dumped into an HTML table or jQuery Datatable (or
equivalent).
- The result listing must include additional fields besides the search
parameter fields.
- a button or link or some mechanism to click on each result and be presented
with a dialog/page/dynamic section of detailed information of the particular item
- Your solution must incorporate Ajax for calling the API
- Your solution must have event handlers for submitting the query (e.g, form submittal or button click)
- Your solution must incorporate data validation for at least one of the query fields (data type, length, etc.)
- Your solution must follow our best practices this semester (strict grading on these):
  - External JavaScript libraries (no embedded JavaScript in HTML)
  - Usage of functions
  - Clean code (usage of let/const for variable declarations, good naming, brief comments, etc.). Remember - less code is more! I should be able to quickly discern the intent of functions and variables by their names.
  - Your solution must _work_ to avoid a major deduction.

# To Run

npm install

## Dev

npm run dev

## Production

npm run build

npm run serve

# Using the form to call the API

Search works on IDs of the activities, so for example

7CE6E935-F839-4FEC-A63E-052B1DEF39D2

brings back biking

Limit changes the max amount of results returned. This is validated to not be higher than the max amount of results returned by the API.

Start changes where the limit starts, it's zero indexed. This is validated to not be higher than the max amount of results returned by the API and the limit.