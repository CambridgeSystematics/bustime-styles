document.addEventListener('DOMContentLoaded', function() {
  // Get all elements with the class 'sub-menu-trigger'
  var subMenuTriggers = document.querySelectorAll('.sub-menu-trigger');

  // Add click event listener to each '.sub-menu-trigger'
  subMenuTriggers.forEach(function(trigger) {
      trigger.addEventListener('click', function() {
          // Find the closest ancestor with class 'parent'
          var parent = this.closest('.parent');
          window.console.log(parent);
          // Toggle the 'open' class on the closest '.parent'
          if (parent) {
              parent.classList.toggle('open');
          }
      });
  });
});
