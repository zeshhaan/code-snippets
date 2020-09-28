# code-snippets

## How to upload stylesheet into Webflow

1. Get the raw format url from Github repo.
   [refer this forum post](https://forum.webflow.com/t/how-to-embed-files-hosted-on-github/29281)
2. Paste that formatted raw URL into [JSDeliver](https://www.jsdelivr.com/rawgit)
3. Copy the JSDeliver URL and paste paste into the link element's href attribute.
    ` <link rel="stylesheet" type="text/css" href="INSERT_JSDELIVER_URL_HERE"> `
