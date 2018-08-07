# Word Count Validator

A captcha for alien trolls! 

## Set up

```
After downloading, `npm install`
Run the server with `npm start`
Run the test suite with `npm test`
```

## Description

A node server - using the express library (for easier request handling) - that: 

 - responds to a client HTTP request with a random body of text and a list of words to ignore 

 - receives a client HTTP request with the same body of text and list of words as well as a count of the frequency of every word in the text excluding the words from the list

If the word count is wrong or if the test's verification fails, the server will send back a 400 error. If it's right, a 200 response will be sent.

## Notes on the Code 

There's no client application here. However, it's easy to test your word counting skills using something like Postman! Just format your response object to include textBody, blacklist, and clientAnswer properties like so:

    {
        "textBody": "To understand recursion you must first understand recursion",
        "blacklist": [ "recursion", "first" ],
        "clientAnswer": {
            "to": 1,
            "understand": 2,
            "you": 1,
            "must": 1
        }
    }

Make sure that your textBody and blacklist are exactly what was given to you by the server, and if you request a new test, make sure that you update your response to match the new test. 

Also, if you restart the server, the test information will be set back to null meaning that the client's response will fail the verification. If this is the case, the client will receive an error message letting them know that they should request a new test.

The way that the 'blacklist', or words to exclude, is generated, is by choosing 1/4 of the text's words at random, so that the list will be unique every time and always proportionate to the amount of text. 

Because of the way that the word count is verified, your clientAnswer word count can be in any order and is not case sensitive.

### Final Notes

Coming soon: use of a regex for splitting words so that texts can use punctuation ~