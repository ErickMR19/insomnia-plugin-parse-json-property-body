module.exports.responseHooks = [
  (context) => {
    const headerValue = context.request.getHeader(
      "INSOMNIA-BODY-PARSE-PROPERTIES"
    );
    let countErrors = 0;
    if (headerValue) {
      propertyNames = headerValue.split(",");
      let response = {};
      try {
        response = JSON.parse(context.response.getBody().toString());
      } catch (error) {
        return;
      } finally {
        propertyNames.forEach((propertyName) => {
          try {
            const parsedValue = JSON.parse(response[propertyName]);
            response[propertyName] = parsedValue;
          } catch (error) {
            ++countErrors;
          }
        });
      }
      if (countErrors < propertyNames.length) {
        context.response.setBody(Buffer.from(JSON.stringify(response)));
      }
    }
  },
];
