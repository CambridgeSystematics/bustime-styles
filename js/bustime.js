document.addEventListener('DOMContentLoaded', function() {


  // sub menus open and close
  var subMenuTriggers = document.querySelectorAll('.sub-menu-trigger');

  subMenuTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function() {
      var parent = this.closest('.parent');
      // window.console.log(parent);

      if (parent) {
        parent.classList.toggle('open');

        var subMenu = parent.querySelector('.sub-menu');
        if (subMenu) {
          // Calculate the actual height of the sub-menu content
          var actualHeight = subMenu.scrollHeight;

          // Clear the inline height style before setting a new height
          subMenu.style.maxHeight = '';

          // Set the height property to achieve animation
          subMenu.style.maxHeight = parent.classList.contains('open') ? actualHeight + 'px' : '0';

          // Toggle tabindex of <a> or <button> elements within .sub-menu
          var innerTabbableItems = subMenu.querySelectorAll('a[tabindex], button[tabindex]');
          innerTabbableItems.forEach(function(element) {
            var currentIndex = element.getAttribute('tabindex');
            element.setAttribute('tabindex', currentIndex === '0' ? '-1' : '0');
          });

          // Set aria-expanded attribute
          this.setAttribute('aria-expanded', parent.classList.contains('open'));
        }
      }
    });
  });

  // map trigger open and close
  var mapTrigger = document.getElementById('map-trigger');
  var map = document.getElementById('map');

  mapTrigger.addEventListener('click', function() {
    mapWrap = document.getElementById('map-wrap');
    
    mapWrap.classList.toggle('open');

    mapTrigger.setAttribute('aria-expanded', map.classList.contains('open'));
    mapTrigger.setAttribute('aria-label', map.classList.contains('open') ? 'Close Map' : 'Open Map');
    mapTrigger.setAttribute('aria-pressed', map.classList.contains('open'));
  });


});
