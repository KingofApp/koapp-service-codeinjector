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
      if(!scopeData.code || scopeData.code == "") return;

      const dummyElement = document.createElement("div");
      dummyElement.innerHTML = scopeData.code;


      //filter elements
      const scripts = dummyElement.querySelectorAll("script");
      const styles = dummyElement.querySelectorAll("style");

      scripts.forEach((element)=>{
        // Create a new script element
        let newScript = document.createElement('script');
        
        // Copy all attributes from the old script to the new one
        Array.from(element.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });

        // Copy the script content if it's an inline script
        if (element.textContent) {
          newScript.textContent = element.textContent;
        }

        addElement("body", newScript);
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