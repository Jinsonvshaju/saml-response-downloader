const button = document.getElementById("saveButton");

const addButtonListner = () => {
  button.addEventListener("click", function () {
    const filename = "saml_response.txt";
    // Define the custom download path
    const customDownloadPath = "SAML/";

    chrome.storage.local.get("samlResponse").then((result) => {
      if (typeof result.samlResponse !== "undefined") {
        const blob = new Blob([result.samlResponse], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        chrome.downloads.download(
          {
            url: url,
            filename: customDownloadPath + filename,
            saveAs: false,
            conflictAction: "overwrite",
            method: "GET",
          },
          function (downloadId) {
            chrome.storage.local.remove("samlResponse", () => {
              console.log(
                'Item "samlResponse" has been removed from chrome.storage.local'
              );
            });
            window.close();
          }
        );
      } else {
        window.close();
      }
    });
  });
};

const alterButtonText = () => {
  chrome.storage.local.get("samlResponse").then((result) => {
    if (typeof result.samlResponse !== "undefined") {
      button.innerHTML = "Save";
      button.style.backgroundColor = '#0056b3';
    } else {
      button.innerHTML = "Close";
      button.style.backgroundColor = 'red';
    }
  });
};

alterButtonText();
addButtonListner();
