// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  //collect elements that have the target class name
  var elements = [];

  //IIFE
  var checkClass = function(element) {
    //if an element has a matching class name
    if (element.classList) {
      if (element.classList.contains(className)) {
        //add it to the element
        elements.push(element);
      }
    }

    if (element.childNodes.length < 1) {
      return;
    } else {
      //recurse on the elements children with element.childNodes
      //var children = Array.from(element.childNodes);
      for (var i = 0; i < element.childNodes.length; i++) {
        checkClass(element.childNodes[i]);
      }
    }
  };

  checkClass(document.body);
  return elements;
};
