//-----------
// below two functions are used to get the URL parameters and load the content based on the URL parameter, so we can load different bustime views for styling in just one HTML file, this should not move over
//-----------

// Function to get URL parameters
function getUrlParams() {
  const params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(match, key, value) {
    params[key] = decodeURIComponent(value);
  });
  return params;
}

// Function to load content based on URL parameter
function loadContent() {
  const urlParams = getUrlParams();
  let content = urlParams['content'];

  // If content parameter is not specified, default to "home"
  if (!content) {
    content = "home";
  }

  // Use AJAX to fetch content from HTML file
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Inject fetched content into the #app div
        document.getElementById('app').innerHTML = xhr.responseText;
      } else {
        console.error('Failed to fetch content');
      }
    }
  };

  // Fetch HTML file from the content directory based on URL parameter
  xhr.open('GET', 'content/' + content + '.html', true);
  xhr.send();
}

document.addEventListener('DOMContentLoaded', function() {

  // Load content based on URL parameter, so we can load different bustime views for styling in just one HTML file, this should not move over
  loadContent();

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
  var mapToggle = document.getElementById('map-toggle');
  var map = document.getElementById('map');
  var mapWrap = document.getElementById('map-wrap');

  mapToggle.addEventListener('click', function() {

    window.console.log('mapToggle clicked');
    
    mapWrap.classList.toggle('open');

    mapToggle.setAttribute('aria-expanded', mapWrap.classList.contains('open'));
    mapToggle.setAttribute('aria-label', mapWrap.classList.contains('open') ? 'Toggle Map Visibility (currently visible)' : 'Toggle Map Visibility (currently hidden)');
    mapToggle.setAttribute('aria-pressed', mapWrap.classList.contains('open'));
  });


});
