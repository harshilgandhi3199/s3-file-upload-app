#!/bin/bash

bucket_name="file-upload-project-storage"
table_name="file-upload-project-db"
id=$1

# getting the inputs from DynamoDB by id
response=$(aws dynamodb get-item \
    --table-name $table_name \
    --key '{"index": {"N": "'"$id"'"}, "id": {"N": "'"$id"'"}}' \
    --attributes-to-get 'input_file_path' 'input_text' \
    --return-consumed-capacity TOTAL )

destdir=./tempFile.json

if [ -f "$destdir" ]
then 
    echo "$response" > "$destdir"
fi

input_text=$(jq '.Item.input_text.S' "$destdir")
input_file_path=$(jq '.Item.input_file_path.S' "$destdir")

IFS='/' read -a temp <<< "$input_file_path"
IFS='"' read -a fileName <<< "${temp[1]}"

# downloading the input file from the S3 bucket
aws s3 cp s3://$bucket_name/${fileName[0]} ./tempFile2.txt

# appending the retrieved input text to the downloaded input file and saving it as OutputFile.txt
text=$(cat tempFile2.txt)
text+=": "
text+=$input_text

echo $text > 'OutputFile.txt'

# Uploading the output file to S3
aws s3 cp 'OutputFile.txt' s3://$bucket_name/

output_file_path="$bucket_name/OutputFile.txt"

# updating the output_file_path field for the current ID
aws dynamodb update-item \
     --table-name $table_name \
     --key '{"index": {"N": "'"$id"'"}, "id": {"N": "'"$id"'"}}' \
     --update-expression "SET output_file_path = :fp" \
     --expression-attribute-values '{
       ":fp": {"S": "'"$output_file_path"'"}
     }'
