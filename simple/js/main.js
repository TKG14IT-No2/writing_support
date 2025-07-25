function InputLine(value){
    WritingArray = writing.value.split('\n');
    Cursor = writing.selectionStart;
    Count = WritingArray[0].length;
    i = 0;
    while(Cursor > Count){
        i++;
        Count += WritingArray[i].length + 1;
    }
    writing.focus();

    WritingArray = writing.value.split('\n');
    WritingArray.splice(i+1,0,value);
    if(WritingArray[0] == ''){WritingArray.shift();}
    writing.value = WritingArray.join('\n');
}

function setVisible(Class){
    const el_1 = document.querySelector('.visible');
    el_1.classList.replace('visible', 'invisible');
    
    const el_2 = document.querySelector(Class);
    el_2.classList.replace('invisible', 'visible');
}

function ClickButton_SettingTwoTriangle(){
    if (!(Text_SettingTwoTriangle_1.value == '' || Text_SettingTwoTriangle_2.value == '')){
        var Value = '△' + Text_SettingTwoTriangle_1.value + 'と△' + Text_SettingTwoTriangle_2.value + 'において';
        InputLine(Value);
        Text_ConcludeRelation_1.value = Text_SettingTwoTriangle_1.value;
        Text_ConcludeRelation_2.value = Text_SettingTwoTriangle_2.value;
        Text_SettingTwoTriangle_1.value = '';
        Text_SettingTwoTriangle_2.value = '';
    }

}
function ClickButton_SettingOneTriangle(){
    if (!(Text_SettingOneTriangle.value == '')){
        var Value = '△' + Text_SettingOneTriangle.value + 'において';
        InputLine(Value);
        Text_ConcludeProperty.value = Text_SettingOneTriangle.value;
        Text_SettingOneTriangle.value = '';
    }
}
function ClickButton_Parallel(){
    var Value = '平行線の' + parallel.value + 'は等しいから';
    InputLine(Value);
    Text_FigureProperty.value = '';
}
function ClickButton_FigureProperty(){
    if(!(Text_FigureProperty.value == '')){
        var Value = figure_type.value + Text_FigureProperty.value + 'は' + figure_property.value + 'だから';
        InputLine(Value);
        Text_FigureProperty.value = '';
    }
}
function ClickButton_LineToLine(){
    if (!(Text_LineToLine_1.value == '' || Text_LineToLine_2.value == '')){
        var Value = line_or_arc.value + Text_LineToLine_1.value + line_to_line.value + line_or_arc.value + Text_LineToLine_2.value;
        InputLine(Value);
        Text_LineToLine_1.value = '';
        Text_LineToLine_2.value = '';
    }
}
function ClickButton_AngleToAngle(){
    if (!(Text_AngleToAngle_1.value == '' || Text_AngleToAngle_2.value == '')){
        var Value = '∠' + Text_AngleToAngle_1.value + angle_to_angle.value + '∠' + Text_AngleToAngle_2.value;
        InputLine(Value);
        Text_AngleToAngle_1.value = '';
        Text_AngleToAngle_2.value = '';
    }
}
function ClickButton_AngleToValue(){
    if (!(Text_AngleToValue_1.value == '' || Text_AngleToValue_2.value == '')){
        var Value = '∠' + Text_AngleToValue_1.value + angle_to_value.value + Text_AngleToValue_2.value + '°';
        InputLine(Value);
        Text_AngleToValue_1.value = '';
        Text_AngleToValue_2.value = '';
    }
}
function ClickButton_ValueToAngle(){
    if (!(Text_ValueToAngle_1.value == '' || Text_ValueToAngle_2.value == '')){
        var Value = Text_ValueToAngle_1.value + '°' + value_to_angle.value + '∠' + Text_ValueToAngle_2.value;
        InputLine(Value);
        Text_ValueToAngle_1.value = '';
        Text_ValueToAngle_2.value = '';
    }
}
function ClickButton_LineRatio(){
    if (!(Text_LineRatio_1.value == '' || Text_LineRatio_2.value == '' || Text_LineRatio_3.value == '' || Text_LineRatio_4.value == '')){
        var Value = Text_LineRatio_1.value + ":" + Text_LineRatio_2.value + "=" + Text_LineRatio_3.value + ":" + Text_LineRatio_4.value;
        InputLine(Value);
        Text_LineRatio_1.value = '';
        Text_LineRatio_2.value = '';
        Text_LineRatio_3.value = '';
        Text_LineRatio_4.value = '';
    }
}
function ClickButton_AddAngle(){
    if (!(Text_AddAngle.value == '')){
        WritingArray = writing.value.split('\n');
        WritingArray = basis.value.split('\n');
        Cursor = writing.selectionStart;
        Cursor = basis.selectionStart;
        Count = WritingArray[0].length;
        i = 0;
        while(Cursor > Count){
            i++;
            Count += WritingArray[i].length + 1;
        }
        writing.focus();
        basis.focus();

        WritingArray[i] += add_angle.value + '∠' + Text_AddAngle.value;
        writing.value = WritingArray.join('\n');
        basis.value = WritingArray.join('\n');

        Text_AddAngle.value = '';
    }
}

function ClickButton_Numbering(data){
    let writingArray = writing.value.split('\n');
    let basisArray = basis.value.split('\n');

    let cursorWriting = writing.selectionStart;
    let countWriting = writingArray[0].length;
    let iWriting = 0;
    while(cursorWriting > countWriting){
        iWriting++;
        countWriting += writingArray[iWriting].length + 1;
    }

    let cursorBasis = basis.selectionStart;
    let countBasis = basisArray[0].length;
    let iBasis = 0;
    while(cursorBasis > countBasis){
        iBasis++;
        countBasis += basisArray[iBasis].length + 1;
    }
    writingArray[iWriting] += data;
    basisArray[iBasis] += data;

    writing.value = writingArray.join('\n');
    basis.value = basisArray.join('\n');

    writing.focus();
    basis.focus();
}

function ClickButton_ReasonNumber(data){
    Text_FromNumber.value += data;
}
function ClickButton_FromNumber(){
    if (!(Text_FromNumber.value == '')){
        var Value = Text_FromNumber.value + 'より';
        InputLine(Value);
        Text_FromNumber.value = '';
    }
}

function ClickButton_ConcludeRelation(){
    if (!(Text_ConcludeRelation_1.value == '' || Text_ConcludeRelation_2.value == '')){
        var Value = '△' + Text_ConcludeRelation_1.value + triangle_relation.value + '△' + Text_ConcludeRelation_2.value;
        InputLine(Value);
        Text_ConcludeRelation_1.value = '';
        Text_ConcludeRelation_2.value = ''
    }
}
function ClickButton_ConcludeProperty(){
    if (!(Text_ConcludeProperty.value == '')){
        var Value = '△' + Text_ConcludeProperty.value + 'は' + triangle_type.value;
        InputLine(Value);
        Text_ConcludeProperty.value = '';
    }
}

function ClickButton_password(){
    if(Text_password.value == 'tokyometropolitanhighschool2024exam'){
        writing.value = '△BMRと△DQTにおいて\n四角形ABCDは長方形だから\n線分BC∥線分AD\n平行線の錯角は等しいから\n∠MBR=∠QDT  ...(1)\n仮定から\n線分AM∥線分QP\n平行線の同位角は等しいから\n∠DRA=∠DTQ  ...(2)\n対角は等しいから\n∠BRM=∠DRA  ...(3)\n(2)(3)より\n∠BRM=∠DRA  ...(4)\n(1)(4)より\n2組の角がそれぞれ等しいから\n△BMR∽△DQT';
    }
}

function timer_start(){
    timer_reset();

    button = document.getElementById('start/stop');
    button.textContent = 'ストップ';
    button.onclick = timer_stop;

    timer = setInterval(function(){
        seconds += 1;
        if(seconds >= 60){
            minutes += 1;
            seconds = 0;
        }
        show_seconds = ('0' + seconds).slice(-2);
        show_minutes = ('0' + minutes).slice(-2);
        document.getElementById('timer').innerText = `${show_minutes}:${show_seconds}`;
    },1000)
}
function timer_stop(){
    clearInterval(timer);
    
    button = document.getElementById('start/stop');
    button.textContent = 'ストップ';
    button.onclick = timer_stop;
}
function timer_reset(){
    timer_stop();
    seconds = 0;
    minutes = 0;
    document.getElementById('timer').innerText = '00:00';
}

function CheckButton(){
}

function manualOpen(){
        window.open(
          'manual.html',
          'MyNewWindow',
          'width=1100,height=600,top=100,left=100,scrollbars=yes'
        );
      }




function ClickButton_WritingIntegrate(){
    writing.style.display = 'block';

    const elements = document.querySelectorAll('.writing_separate');
    elements.forEach(el => {
        el.style.display = 'none';
    });

    var button = document.getElementById('Button_ModeChange');
    button.textContent = '分割';
    button.onclick = ClickButton_WritingSeparate;
}

function ClickButton_WritingSeparate(){
    writing.style.display = 'none';
    
    const elements = document.querySelectorAll('.writing_separate');
    elements.forEach(el => {
        el.style.display = 'block';
    });

    var button = document.getElementById('Button_ModeChange');
    button.textContent = '結合';
    button.onclick = ClickButton_WritingIntegrate;
}



var WritingArray = [];
var ReasonNumber = 1;

var seconds = 0;
var minutes = 0;
var show_seconds;
var show_minutes;
var timer;

var Cursor;
var Count;

const Text_SettingTwoTriangle_1 = document.getElementById('Text_SettingTwoTriangle_1')
const Text_SettingTwoTriangle_2 = document.getElementById('Text_SettingTwoTriangle_2')
const Text_SettingOneTriangle = document.getElementById('Text_SettingOneTriangle')
const Text_FigureProperty = document.getElementById('Text_FigureProperty')
const Text_LineToLine_1 = document.getElementById('Text_LineToLine_1')
const Text_LineToLine_2 = document.getElementById('Text_LineToLine_2')
const Text_AngleToAngle_1 = document.getElementById('Text_AngleToAngle_1')
const Text_AngleToAngle_2 = document.getElementById('Text_AngleToAngle_2')
const Text_AngleToValue_1 = document.getElementById('Text_AngleToValue_1')
const Text_AngleToValue_2 = document.getElementById('Text_AngleToValue_2')
const Text_ValueToAngle_1 = document.getElementById('Text_ValueToAngle_1')
const Text_ValueToAngle_2 = document.getElementById('Text_ValueToAngle_2')
const Text_LineRatio_1 = document.getElementById('Text_LineRatio_1')
const Text_LineRatio_2 = document.getElementById('Text_LineRatio_2')
const Text_LineRatio_3 = document.getElementById('Text_LineRatio_3')
const Text_LineRatio_4 = document.getElementById('Text_LineRatio_4')
const Text_AddAngle = document.getElementById('Text_AddAngle')
const Text_Numbering = document.getElementById('Text_Numbering')
const Text_FromNumber = document.getElementById('Text_FromNumber')
const Text_ConcludeRelation_1 = document.getElementById('Text_ConcludeRelation_1')
const Text_ConcludeRelation_2 = document.getElementById('Text_ConcludeRelation_2')
const Text_ConcludeProperty = document.getElementById('Text_ConcludeProperty')

const figure_type = document.getElementById('figure_type');
const figure_property = document.getElementById('figure_property');
const line_to_line = document.getElementById('line_to_line');
const line_or_arc = document.getElementById('line_or_arc');
const angle_to_angle = document.getElementById('angle_to_angle');
const angle_to_value = document.getElementById('angle_to_value');
const value_to_angle = document.getElementById('value_to_angle');
const add_angle = document.getElementById('add_angle');
const triangle_relation = document.getElementById('triangle_relation');
const triangle_type = document.getElementById('triangle_type');

const writing = document.getElementById('writing');
const A_part = document.getElementById('A_part');
const B_part = document.getElementById('B_part');
const C_part = document.getElementById('C_part');
const assumption = document.getElementById('assumption');
const basis = document.getElementById('basis');
const conclusion = document.getElementById('conclusion');


Text_SettingTwoTriangle_1.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_SettingTwoTriangle()}});
Text_SettingTwoTriangle_2.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_SettingTwoTriangle()}});
Text_SettingOneTriangle.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_SettingOneTriangle()}});
Text_FigureProperty.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_FigureProperty()}});
Text_LineToLine_1.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_LineToLine()}});
Text_LineToLine_2.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_LineToLine()}});
Text_AngleToAngle_1.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_AngleToAngle()}});
Text_AngleToAngle_2.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_AngleToAngle()}});
Text_AngleToValue_1.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_AngleToValue()}});
Text_AngleToValue_2.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_AngleToValue()}});
Text_ValueToAngle_1.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_ValueToAngle()}});
Text_ValueToAngle_2.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_ValueToAngle()}});
Text_LineRatio_1.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_LineRatio()}});
Text_LineRatio_2.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_LineRatio()}});
Text_LineRatio_3.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_LineRatio()}});
Text_LineRatio_4.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_LineRatio()}});
Text_AddAngle.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_AddAngle()}});
Text_FromNumber.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_FromNumber()}});
Text_ConcludeRelation_1.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_ConcludeRelation()}});
Text_ConcludeRelation_2.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_ConcludeRelation()}});
Text_ConcludeProperty.addEventListener('keydown',function(e){if(e.key == 'Enter'){ClickButton_ConcludeProperty()}});
