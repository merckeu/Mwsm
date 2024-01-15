      $(document).ready(function() {
       $('.host').text($(location).attr('host')+"/send-message");

        var socket = io();
  
        socket.on('message', function(msg) {
          $('.logs').append($('<li>').text(msg));
          $('#Scroll').animate({scrollTop: $('#Scroll').prop("scrollHeight")}, 500);
        });
  
        socket.on('qr', function(src) {
          $('#qrcode').attr('src', src);
          $('#qrcode').show();
        });
  
        socket.on('ready', function(data) {
          $('#qrcode').hide();
        });
  
        socket.on('authenticated', function(data) {
          $('#qrcode').hide();
        });
      });
