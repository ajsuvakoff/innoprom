window.onload = ajaxGetXML;  
 
function ajaxGetXML(){
    $.ajax({
        type: "POST", // метод передачи данных
        url: "http://88.201.250.54:8088/api", // путь к xml файлу
        dataType: "xml", // тип данных
        // если получили данные из файла
        success: function(data) {
            var tablo = "";
            
                          setTimeout (ajaxGetXML, 100);
            
            
            $(data).find('input').eq(4).each(function(){
                var number1 = $(this).attr('number'); // получаем значение атрибута id_user
                var timer = $(this).find('text').eq(2).html(); // получ
                var shortleft = $(this).find('text').eq(0).html(); // получаем значение тега last_name
                var shortright = $(this).find('text').eq(1).html(); // получаем значение тега role
                
                
                
                tablo += "<label>ID: "+number1+"</label><br/>";
                tablo += "<label>Таймер: "+timer+"</label><br/>";
                tablo += "<label>Хозяева: "+shortleft+"</label><br/>";
                tablo += "<label>Гости: "+shortright+"</label>";   
                tablo += "<hr/>";  
              
            document.getElementById("timer").innerHTML = timer;
            document.getElementById("shortnameL").placeholder = shortleft;
            document.getElementById("shortnameR").placeholder = shortright;
                
        
            
                 });  
            
        
              $(data).find('input').eq(5).each(function(){
                var number2 = $(this).attr('number'); // получаем значение атрибута id_user
                var matchstatus = $(this).find('text').eq(0).html(); // получ
                var fullleft = $(this).find('text').eq(1).html(); // получаем значение тега last_name
                var fullright = $(this).find('text').eq(2).html(); // получаем значение тега role
                
                tablo += "<label>ID: "+number2+"</label><br/>";
                tablo += "<label>Статус матча: "+matchstatus+"</label><br/>";
                tablo += "<label>Хозяева: "+fullleft+"</label><br/>";
                tablo += "<label>Гости: "+fullright+"</label>";   
                tablo += "<hr/>";  
                  
                  
                  
             document.getElementById("fullnameL").placeholder = fullleft;
             document.getElementById("fullnameR").placeholder = fullright;
             

                 }); 
            
              $(data).find('input').eq(1).each(function(){
                var number3 = $(this).attr('number'); // получаем значение атрибута id_user
                var camsound = $(this).attr('muted');
            
                
                tablo += "<label>ID: "+number3+"</label><br/>";
                tablo += "<label>Muted: "+camsound+"</label>";
                tablo += "<hr/>";  
  
                 }); 
            
            $('#tablo').html(tablo); // выводим данные
        },
        // если произошла ошибка при получении файла
        error: function(){
            alert('ERROR');
        }
        
    });
}

