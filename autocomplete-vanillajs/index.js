// Mock Server
const FAILURE_COUNT = 0;
const LATENCY = 200;

function getRandomBool(n) {
  const threshold = 1000;
  if (n > threshold) n = threshold;
  return Math.floor(Math.random() * threshold) % n === 0;
}

function getSuggestions(text) {
  var pre = 'pre';
  var post = 'post';
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    const randomTimeout = Math.random() * LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COUNT)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

// Create an Auto Suggestion Box in Vanilla JS
// Create a suggestion area bottom to the input box that shows the suggestion list.
// The list is visible when the input box is in focus or when user types, it hides when the input box is blurred
// getSuggestions(text); method will act as mock server and will return random text based on the inputs with 0 - 200 millisceond latency and may fail.
// if a suggestion is clicked, populate the input box with its value and bring input box in focus

// (function(){
//   const input = document.getElementById("search");
//   const suggestionArea = document.getElementById("suggestion-area");
  
//   const onFocus = () => {
//     suggestionArea.style.display = "block";
//   }
  
//   const onBlur = (e) => {
//     if(e.target === input || e.target === suggestionArea){
//       return;
//     }
    
//     suggestionArea.style.display = "none";
//   }
  
//   const onChange = (e) => {
//     const {value} = e.target;
//     processData(value);
//   }
  
//   const processData = async (value) => {
//     suggestionArea.style.display = "block";
//     suggestionArea.innerHTML = "";
    
//     if(!value){
//       return;
//     }
    
//     try{
//       const resp = await getSuggestions(value);
//       if(resp.length > 0){
//         const list = document.createElement('ul');
//         resp.forEach((e) => {
//           const listItems = document.createElement('li');
//           listItems.style.cursor = "pointer";
//           listItems.innerText = e;
//           list.appendChild(listItems);
//         });
        
//         suggestionArea.innerHTML = "";
//         suggestionArea.appendChild(list);
//       }
//     }catch(e){
//       console.error("Error while making network call", e);
//     }
//   } 
  
//   const onClick = (e) => {
//     if(e.target === suggestionArea){
//       return;
//     }
    
//     const text = e.target.innerText;
//     input.value = text;
//     input.focus();
//   }
  
//   input.addEventListener('focus', onFocus);
//   window.addEventListener('click', onBlur);
//   input.addEventListener('keyup', onChange);
//   suggestionArea.addEventListener('click', onClick, true);
// }());

(function () {
    const input = document.getElementById("search");
    const suggestionArea = document.getElementById("suggestion-area");
    
    const onFocus = () => {
        suggestionArea.style.display = 'block';
    }
    
    const onBlur = (e) => {
        if(e.target == input || e.target == suggestionArea)
            return;
        suggestionArea.style.display = 'none';
    }

    const onClick = (e) => {
        suggestionArea.style.display = 'block';

        if(e.target == suggestionArea) return;

        const text = e.target.innerText;
        input.value = text;
        input.focus();
    }

    const onKeyUp = (e) => {
        suggestionArea.style.display = "block";
        suggestionArea.innerHTML = "";
        processData(e.target.value);
    }

    const processData = async (text) => {
        if(!text) {
            return;
        }

        try {
            const resp = await getSuggestions(text);
            if(resp.length > 0) {
                const list = document.createElement('ul');
                resp.forEach(res => {
                    const item = document.createElement('li');
                    item.innerText = res;
                    item.style.cursor = 'pointer';
                    list.appendChild(item);
                });
                suggestionArea.innerHTML = "";
                suggestionArea.appendChild(list);
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    input.addEventListener("focus", onFocus);
    window.addEventListener("click", onBlur);
    input.addEventListener("keyup", onKeyUp);
    suggestionArea.addEventListener("click", onClick, true);
}());