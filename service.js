(function () {
  angular
    .module('king.services.codeinjector', [])
    .run(codeinjectorFunction);

  codeinjectorFunction.$inject = ['configService', '$window', '$translate'];

  function codeinjectorFunction(configService, $window, $translate) {

    if (configService.services) {
      codeinjectorFunction(configService.services.codeinjector.scope, configService.services.codeinjector['scope-lang']);
    }
  
    function codeinjectorFunction(scopeData, scopeLang) {
      /* set language vars */
      var lang = $translate.use()? $translate.use().replace('_', '-'): "en-US";
      var scopeDataLang = scopeLang[lang];
      var code = scopeDataLang.codeLang != ""? scopeDataLang.codeLang : scopeData.code;
      /* END set language vars */

      const dummyElement = document.createElement("div");
      dummyElement.innerHTML = code;


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