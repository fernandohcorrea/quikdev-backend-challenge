## Requirements

### Functionality

- :white_check_mark: The API should follow typical RESTful API design pattern.
- :white_check_mark: The data should be saved in the DB (Mongo is preferred).
- :white_check_mark: Provide proper API document.
- :white_medium_square: Provide proper unit test.

### Tech stack

- :white_check_mark: **Provide a Docker stack (give the reviewers a happy day and they will thank you)**
- :white_check_mark: Use Node.js with any or no framework.
- :white_check_mark: Use any DB. Mongo DB is **highly preferred**.
- :white_check_mark: Provide  **CLEAR README**  information like versions required, step-by-step to setup environment, etc

### Bonus

- :white_check_mark: Write clear documentation on how it's designed and how to run the code.
- :white_check_mark: Write good in-code comments.
- :white_check_mark: Write good commit messages.

### Advanced requirements

*These are mandatory for mid, senior and lead developer levels*

- :white_check_mark: Provide a complete user auth (authentication/authorization/etc.) strategy.
- :white_medium_square: Provide a complete logging (when/how/etc.) strategy.
- :white_medium_square: Imagine we have a new requirement right now that the user instances need to link to each other, i.e., a list or "friends". Can you find out how you would design the model structure and what API you would build for querying or modifying it?
- :white_medium_square: Related to the requirement above, suppose the address of user now includes a geographic coordinate (i.e., latitude and longitude), can you build an API that,
  - given a user name
  - return the nearby friends

