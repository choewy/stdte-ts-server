#!/bin/bash

NAME=$1
URL=$2
VALUE=$3

HEADER="Content-Type: application/json"
BODY="
  {
    \"username\": \"Github Actions($NAME)\", 
    \"text\": \"\", 
    \"icon_emoji\": \":gear:\", 
    \"unfurl_links\":true, 
    \"attachments\": [
      {
        \"fallback\": \"\", 
        \"color\": \"good\",
        \"fields\": [{ \"title\": \"\", \"value\": \"\`\`\`"$VALUE"\`\`\`\"}]
      }
    ]
  }"

echo "$BODY" >> ./payload.json

curl -X POST -H "$HEADER" -d "$BODY" "$URL"
