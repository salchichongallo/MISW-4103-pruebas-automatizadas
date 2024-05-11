report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\ghost-3-42-9\\backstop_ghost_Login_0_document_0_default.png",
        "test": "..\\ghost\\5-82\\20240510-213641\\backstop_ghost_Login_0_document_0_default.png",
        "selector": "document",
        "fileName": "backstop_ghost_Login_0_document_0_default.png",
        "label": "Login",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "http://ec2-54-91-89-99.compute-1.amazonaws.com:2368/ghost/",
        "referenceUrl": "http://ec2-54-158-234-189.compute-1.amazonaws.com:2368/ghost",
        "expect": 0,
        "viewportLabel": "default",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 111,
            "height": 3
          },
          "rawMisMatchPercentage": 11.80649988258488,
          "misMatchPercentage": "11.81",
          "analysisTime": 125
        },
        "diffImage": "..\\ghost\\5-82\\20240510-213641\\failed_diff_backstop_ghost_Login_0_document_0_default.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_ghost"
});