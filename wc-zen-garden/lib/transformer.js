(function() {
  console.log('transforming');
  
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        alert(xhr.responseText);
    }
  }
  xhr.open('GET', 'http://example.com', true);
  xhr.send(null);
  
  
  // view-source:http://www.csszengarden.com/213/213.css
})();