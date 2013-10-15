$(function() {

  var markup = {
    base: ['address', 'blockquote', 'details', 'figure'],
    patterns: ['alerts', 'breadcrumbs']
  };


  function load(folder, container) {
    var files = [], i;

    for(i = 0; i < markup[folder].length; i++) {
      files.push(getFile('markup/' + folder + '/' + markup[folder][i] + '.html'));
    }
    $.when.apply(this, files).done(function(def) {
      render(files, folder, container);
    });
  }

  /**
   * Load content of .html file
   * @param  {String} path Location of the file
   * @return {Object}      jQuery Deferred
   */
  function getFile(path) {
    return $.ajax({
      url: path
    });
  }

  function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function render(files, folder, container) {
    var output = '';
    $.each(files, function(i, file){
      if(file.status === 200) {
        console.log(file);
        output += '<div class="sg-markup sg-section">';
        output += '<div class="sg-display">';
        output += '<h2 class="sg-h2"><a id="sg-' + markup[folder][i] + ' class="sg-anchor">' + markup[folder][i] + '</a></h2>';
        output += file.responseText;
        output += '</div>';
        output += '<div class="sg-markup-controls"><a class="sg-btn sg-btn--source" href="#">View Source</a> <a class="sg-btn--top" href="#top">Back to Top</a> </div>';
        output += '<div class="sg-source sg-animated">';
        output += '<a class="sg-btn sg-btn--select" href="#">Copy Source</a>';
        output += '<pre class="prettyprint linenums"><code>';
        output += htmlEntities(file.responseText);
        output += '</code></pre>';
        output += '</div>';
        output += '</div>';
      }
    });

    $(container).append(output);
    if(styleGuide) {
      styleGuide.initEvents();
      prettyPrint();
    }
  }
  load('base', '.sg-base-styles');
  load('patterns', '.sg-pattern-styles');
});