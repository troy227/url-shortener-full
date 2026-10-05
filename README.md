Problem Statement - Build a URL shortener.

A user can create a short link from a long target URL. The system returns a short code and a short URL. Anyone can resolve a code and be redirected (or receive the target URL as JSON if redirect is awkward in the demo). Optionally allow a custom alias. Reject an invalid URL. Reject a duplicate custom alias.

Vue: a form to paste a URL (and optional alias), a list of created links with code, target, and clicks, and a way to "open" or copy the short path.

## PLAN URL Shortener

### Functional Requirements
1. User should be able to shorten a URL
2. When user clicks on shorten URL, they should be redirected to the long url.
3. Optionally support custom code
4. Optionally support expiry

### Non Functional Requirements
1. Low latency of redirects
2. short code should be unique


### Core entities
1. URLS
 - id - pkey
 - shortCode (unique)
 - longUrl
 - expiry (optional)
 - created at

### APIs

1. POST /urls - Converts a given long url to short url
API Request Body - {
    longUrl: string,
    shortCode?: string,
    expiry?: string,
}
Response - {
    shortUrl: string
}

2. GET /:shortCode
FE should go to BASE_URL/shortCode and get /urls/{shortCode} which returns a 
{longUrl: string} with status code 302 then FE redirects to longUrl.


### URL Encoding logic
Based on the inserted ID, do an update query to generate the short code as last 6 characters of base62 encoded.


## FE

1. A Home page view with title at the top. 
2. There should be a text box to enter the long url and a "shorten" button which calls the POST /urls API.
3. The POST api returns a short URL which will be displayed on a screen with a "Copy" button.
4. When user clicks on the short url or enters the short url in the browser, it should hit the GET /shortcode API and redirect to the long URL