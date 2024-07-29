(function () {
  angular
    .module('king.services.codeinjector', [])
    .run(codeinjectorFunction);

  codeinjectorFunction.$inject = ['configService'];

  function codeinjectorFunction(configService) {

    if (configService.services) {
      codeinjectorFunction(configService.services.codeinjector.scope);
    }
  
    function codeinjectorFunction(scopeData) {  

      const dummyElement = document.createElement("div");
      dummyElement.innerHTML = scopeData.code;


      //filter elements
      const scripts = dummyElement.querySelectorAll("script");
      const styles = dummyElement.querySelectorAll("style");

      scripts.forEach((element)=>{
        addElement("body", element);
      })

      styles.forEach((element)=>{
        addElement("head", element);
      })

      // Function to add an element to a specified location in the document
      function addElement(documentLocation, element) {
          try {
              let parentElement = document.querySelector(documentLocation);
              if (!parentElement) throw new Error(`Parent element not found: ${documentLocation}`);
              
              parentElement.appendChild(element);
              
          } catch (error) {
              console.error(error);
          }
      }
    }
  }
})();