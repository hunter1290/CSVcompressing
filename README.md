### This is the backend server of the image compressing upto 50% 
### working is simple along side the lld design that we take in use for it
## it beter explain with the help of the daigram that is showing below

### for running it in your local machine u need to clone it first 
## after that you need to run "npm install" or "yarn install" for installing nesecarry modules used in it.
## now create a file name .env and provide the port number you want to run your server with mongoDB connection string.
![image](https://github.com/user-attachments/assets/ac2e6c84-130d-4e8e-acd6-a99846ecb759)

## now using postman or any other platform you can hit the endpoint for getting the results
## Endpoint are: - 
### POST /upload -> Accepts a CSV file validate it process it
###              -> Return the request id and the status 
### GET /status -> Return the status and output if status pending return an empty array other wise output array including 
###                compressed files URLs
