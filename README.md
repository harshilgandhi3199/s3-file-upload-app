# Fovus Intern Coding Project

This project demonstrates uploading a file to AWS S3 and input text to DynamoDB using AWS Lambda Functions

## System requirements

Node.js

AWS CLI

## How to run the code
Run the following command in the local IDE after cloning the project
```bash
npm start
```
This will start the server in the browser using the local host. Upon inserting text and uploading text file, the text file will be uploaded to AWS S3 bucket and the text will be saved to the DynamoDB

## Run Bash Script

```bash
cd script
bash task.sh [id]
```

for example,
```bash
bash task.sh 1
```
After running the above script, the text input will be appended to the content of the file and the file will be uploaded to S3 as 'OutputFile.txt' and the path will be saved to the DynamoDB
