var callTime=0;
function changeTheme()
{
    callTime++;
    callTime%=2;
    var bcol="#000";
    var th1=document.getElementById("theme1");
    var th2=document.getElementById("theme-toggle");
    var th3=document.getElementById("theme3");
    var th4=document.getElementById("theme4");
    var th5=document.getElementById("theme5");
    var th6=document.getElementById("theme6");
    var th7=document.getElementById("theme7");
    var th8=document.getElementById("theme8");
    var th9=document.getElementById("theme9");
    if(callTime%2==1){
        th1.style.background="#000001";
        th1.style.color="#fff";
        th2.innerHTML="Light";
        th8.style.background="#000001";
    }
    else{
        th1.style.background="#3b1b03";
        th1.style.color="#fff";
        th2.innerHTML="Dark";
        th8.style.background="#fff";
    }

}