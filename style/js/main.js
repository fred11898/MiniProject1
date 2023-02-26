const chatData = [
    {
      question: "What is the capital city of the philippines?",
      response: "The Capital City of the Philippines is Manila"
    },
    {
      question: "What language is spoken in the philippines",
      response: "The official language of the Philippines is Filipino"
    },
    {
      question: "What time is it in the philippines?",
      response: () => new Date().toLocaleTimeString()
    },
    {
      question: "Hi",
      response: "Hello, How may i help you?"
    }
  ];
  
  const messagesDiv = document.getElementById("messages");
  const userInput = document.getElementById("user-input");
  
  userInput.addEventListener("keydown", function(event) {
    if (event.code === "Enter") {
      event.preventDefault();
      const question = userInput.value;
      displayMessage(question, true);
      getResponse(question).then(response => {
        displayMessage(response, false);
      });
      userInput.value = "";
    }
  });
  
  function getResponse(question) {
    return new Promise(resolve => {
      const responseObj = chatData.find(obj => obj.question.toLowerCase() === question.toLowerCase());
      if (responseObj) {
        if (typeof responseObj.response === "function") {
          setTimeout(() => {
            resolve(responseObj.response());
          }, 2000);
        } else {
          resolve(responseObj.response);
        }
      } else {
        setTimeout(() => {
          resolve("I'm sorry, I don't understand your question.");
        }, 5000);
      }
    });
  }
  
  function displayMessage(message, isQuestion) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(isQuestion ? "question" : "response");
    messageDiv.textContent = message;
    messagesDiv.appendChild(messageDiv);
  }