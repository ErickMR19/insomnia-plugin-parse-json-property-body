If the response from a server is a JSON document, and some of the properties' values are also objects but encoded as a JSON string, Insomnia won't be aware that they are nested documents. Thus, losing access to significant functionality (like JSONPath or XPath) and becoming difficult to read.

# Installation

Install the `insomnia-plugin-parse-json-property-body` plugin from Preferences > Plugins.

# Usage

Add a header with the name `INSOMNIA-BODY-PARSE-PROPERTIES`.
As value use the property or properties that you want to be parsed (decoded).

# Example

If the server's response is:

```javascript
    {
        "type": "update",
        "payload": "{\"country\":\"Costa Rica\",\"language\":\"Spanish\",\"population\":5087938}"
    }
```

You can't use JSONPath to get the country name.

Setting a header `INSOMNIA-BODY-PARSE-PROPERTIES` with value `payload` the new response body will be:

```javascript
    {
        "type": "update",
        "payload": {
            "country": "Costa Rica",
            "language": "Spanish",
            "population": 5000000
        }
    }
```

To define multiple properties to be parsed write the number separated by commas (no spaces)
`property1,property2,property3`
