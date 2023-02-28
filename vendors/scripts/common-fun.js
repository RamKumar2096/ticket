const toNameCase = (phrase) => {
    return phrase
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

   // system generating random Id for sales and Leads
   function returnHash(){
    var abc = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    var token=""; 
    for(i=0;i<5;i++){
      token += abc[Math.floor(Math.random()*abc.length)];
    }
    return token; 
  }

  function dateToStr(date){
    var date = new Date(date);
    var a = date.getDate();
    var b = date.getMonth()+1;
    var c = date.getFullYear();
    if(a <= 9) {
      a = '0'+a;
    }
    if(b<=9) {
      b = '0'+b;
    }
    var d = a+"/"+b+"/"+c
  return d;
  }