$(document).ready(function() {
  // Show user info function
  showUserInfo = function( id ) {
    if (typeof id === 'undefined' || id < 1 || id > 4) {
      return hideUserInfo();
    }
    
    var id = parseInt(id),
        m = $('#myModal'),
        u = $('[data-user="' + id + '"]');
 
    // User info
    m.find('> .modal-header > h3').html('User: ' + u.find('> .media-body > .media-heading > a').html());
    m.find('> .modal-body > p').html(u.find('> .media-body > p').html());
    m.find('> .modal-body > img').attr('src', u.find('> a > img').attr('src'));
    
    // Prev user button
    if (id === 1) {
      m.find('> .modal-footer > a.pull-left').hide();
    } else {
      m.find('> .modal-footer > a.pull-left').attr('href', '#user-' + (id-1)).show();
    }
    
    // Next user button
    if (id === 4) {
      m.find('> .modal-footer > a.pull-right').hide();
    } else {
      m.find('> .modal-footer > a.pull-right').attr('href', '#user-' + (id+1)).show();
    }
    
    $('#myModal').modal('show');
    $('.arrow.arrow-demo2').fadeIn('slow');
    
    return false;
  }
  
  // Hide user info function
  hideUserInfo = function() {
    $('#myModal').modal('hide');
    $('.arrow.arrow-demo2').hide();
    return false;
  }  
  
  // Link tooltips
  $( "[data-user]" ).each(function( index ) {
    var id = $(this).data('user');
    if (index == -1) {
      $(this).find('> .media-body > .media-heading > a').tooltip({title: 'click this…', placement: 'top', trigger: 'manual'}).tooltip('show');
      $(this).find('> a').tooltip({title: '…or this', placement: 'left', trigger: 'manual'}).tooltip('show');
    } else {
      $(this).find('> .media-body > .media-heading > a').tooltip({title: 'a.#user-' + id, placement: 'top'});
      $(this).find('> a').tooltip({title: 'a.#user-' + id, placement: 'left'});
    }
  });
  $('a.btn-danger').tooltip({title: 'a.#alert', placement: 'right', trigger: 'none'}).tooltip('show');
  
  // make code pretty
  window.prettyPrint && prettyPrint();
});
