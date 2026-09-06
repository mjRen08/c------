// 读取本地存储记录
function getRecord(){
    const str = localStorage.getItem("quizRecord");
    return str ? JSON.parse(str) : {};
}
// 保存记录到本地
function saveRecord(obj){
    localStorage.setItem("quizRecord", JSON.stringify(obj));
}

// 全局答题变量
let currentTopic;
let currentDiff;
let quizList;
let currentQ = 0;
let userSelect = [];
let isReadOnly = false;

//渲染题目
function renderQuestion(){
    const q = quizList[currentQ];
    document.getElementById("q-text").innerText = q.q;
    document.getElementById("q-index").innerText = `第${currentQ+1}题 / 共${quizList.length}题`
    let doneCount = userSelect.filter(x=>x!==null).length;
    document.getElementById("progress").style.width = `${doneCount/quizList.length*100}%`

    const optWrap = document.getElementById("option-container");
    optWrap.innerHTML = "";
    const userAns = userSelect[currentQ];
    const rightAns = q.ans;

    q.opts.forEach((opt,idx)=>{
        const div = document.createElement("div");
        div.className = "option-item";

        if(isReadOnly){
            div.classList.add("readonly");
            // 正确答案标绿
            if(idx === rightAns){
                div.classList.add("correct-ans");
            }
            // 用户选的答案，并且选错了，标红
            if(idx === userAns && userAns !== rightAns){
                div.classList.add("wrong-choose");
            }
        }else{
            if(userSelect[currentQ] === idx) div.classList.add("selected");
            div.onclick = ()=>{
                userSelect[currentQ] = idx;
                renderQuestion();
            }
        }
        div.innerText = opt;
        optWrap.appendChild(div);
    })

    // 控制上一题按钮，第一题禁用
    const prevBtn = document.getElementById("prev-btn");
    if(currentQ === 0){
        prevBtn.disabled = true;
        prevBtn.style.opacity = 0.5;
    }else{
        prevBtn.disabled = false;
        prevBtn.style.opacity = 1;
    }
}

//上一题
document.getElementById("prev-btn").onclick = function(){
    if(currentQ > 0){
        currentQ--;
        renderQuestion();
    }
}
//下一题
document.getElementById("next-btn").onclick = function(){
    if(currentQ < quizList.length - 1){
        currentQ++;
        renderQuestion();
    }
}

// 组装成绩弹窗内容并打开弹窗
function showResultPopup(){
    let score = 0;
    let html = "";
    for(let i=0;i<quizList.length;i++){
        const q = quizList[i];
        const uAns = userSelect[i];
        const rightAns = q.ans;
        const isRight = (uAns === rightAns);
        if(isRight) score += 20;
        html += `<div class="result-item">
            <div class="q-title">第${i+1}题：${q.q}</div>
            <div>${isRight?'✅正确':'❌错误'}</div>
            <div>你的选择：${q.opts[uAns]}</div>
            <div class="correct">正确答案：${q.opts[rightAns]}</div>
        </div>`
    }
    document.getElementById("score-text").innerText = `总分：${score}/100`
    document.getElementById("result-detail").innerHTML = html;
    document.getElementById("resultModal").style.display = "flex";
}

// 查看成绩按钮点击事件
document.getElementById("showResultBtn").onclick = showResultPopup;

//提交试卷：保存本次答题记录
document.getElementById("submit-btn").onclick = function(){
    //检查有没有漏答
    const emptyIndex = userSelect.findIndex(item => item === null);
    if(emptyIndex !== -1){
        alert(`还有未作答题目：第${emptyIndex+1}题，请完成所有题目再提交！`);
        return;
    }

    let score = 0;
    let html = "";
    let wrongList = [];
    for(let i=0;i<quizList.length;i++){
        const q = quizList[i];
        const uAns = userSelect[i];
        const rightAns = q.ans;
        const isRight = (uAns === rightAns);
        if(isRight) score += 20;
        else wrongList.push(i);
        html += `<div class="result-item">
            <div class="q-title">第${i+1}题：${q.q}</div>
            <div>${isRight?'✅正确':'❌错误'}</div>
            <div>你的选择：${q.opts[uAns]}</div>
            <div class="correct">正确答案：${q.opts[rightAns]}</div>
        </div>`
    }
    //写入本地存储
    const record = getRecord();
    const key = `${currentTopic}-${currentDiff}`;
    record[key] = {
        answers: userSelect,
        score: score,
        wrongIndex: wrongList,
        finishTime: new Date().toLocaleString()
    };
    saveRecord(record);
    refreshHomeMark();

    document.getElementById("score-text").innerText = `总分：${score}/100`
    document.getElementById("result-detail").innerHTML = html;
    document.getElementById("resultModal").style.display = "flex";
    //提交完成后切换只读模式，隐藏提交按钮，显示查看成绩按钮
    isReadOnly = true;
    document.getElementById("readonlyTip").style.display = "block";
    document.getElementById("submit-btn").style.display = "none";
    document.getElementById("showResultBtn").style.display = "inline-block";
}

//关闭弹窗
function closeModal(){
    document.getElementById("resultModal").style.display = "none";
}

//返回专题首页
document.getElementById("back-home").onclick = function(){
    window.location.href = "index.html";
}

// 更新首页：已经做完的试卷小圆标绿色（首页调用）
function refreshHomeMark(){
    const record = getRecord();
    document.querySelectorAll(".dot-box a").forEach(link=>{
        link.classList.remove("done");
    })
    for(const key in record){
        const [t,d] = key.split("-");
        const itemDom = document.querySelector(`.item[data-topic="${t}"] .dot-box a:nth-child(${Number(d)+1})`);
        if(itemDom) itemDom.classList.add("done");
    }
}

// 试卷页面初始化函数，每个试卷html页面底部调用initQuiz
function initQuiz(topicId,diffId,questionData){
    currentTopic = topicId;
    currentDiff = diffId;
    quizList = questionData;
    currentQ = 0;
    const record = getRecord();
    const key = `${topicId}-${diffId}`;

    if(record[key]){
        // 已有作答记录：只读查看模式
        userSelect = [...record[key].answers];
        isReadOnly = true;
        document.getElementById("readonlyTip").style.display = "block";
        document.getElementById("submit-btn").style.display = "none";
        document.getElementById("showResultBtn").style.display = "inline-block";
        renderQuestion();
        // 打开已完成试卷，自动弹出成绩弹窗
        showResultPopup();
    }else{
        //无记录：正常答题模式
        userSelect = Array(quizList.length).fill(null);
        isReadOnly = false;
        document.getElementById("readonlyTip").style.display = "none";
        document.getElementById("submit-btn").style.display = "block";
        document.getElementById("showResultBtn").style.display = "none";
    }
    renderQuestion();
}