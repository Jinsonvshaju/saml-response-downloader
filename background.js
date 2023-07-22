chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    const regex = /^https:\/\/signin\.aws\.amazon\.com\/saml$/;
    if (regex.test(details.url)) {
      console.log(details.requestBody.formData.SAMLResponse[0]);
      // Store the message in chrome.storage.local
      chrome.storage.local
        .set({ samlResponse: details.requestBody.formData.SAMLResponse[0] })
        .then(() => {
          console.log("Value is set");
        });
    }
  },
  { urls: ["<all_urls>"] },
  ["requestBody"]
);
