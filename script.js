// jQueryを使用して、ドキュメントが完全に読み込まれたら実行
$(document).ready(function() {

    // 1. 変数と定数の初期化
    const choices = ['rock', 'scissors', 'paper'];
    const choiceText = {
        rock: '✊ グー',
        scissors: '✌️ チョキ',
        paper: '✋ パー'
    };
    
    // 統計データを格納するオブジェクト
    let stats = {
        wins: 0,
        losses: 0,
        draws: 0
    };

    // Chart.jsのインスタンスを格納する変数
    let statsChart;

    // 2. Chart.jsでグラフを初期化する関数
    function initializeChart() {
        const ctx = $('#statsChart')[0].getContext('2d');
        statsChart = new Chart(ctx, {
            type: 'pie', // グラフの種類は円グラフ
            data: {
                labels: ['勝ち', '負け', '引き分け'],
                datasets: [{
                    label: '対戦成績',
                    data: [0, 0, 0], // 初期データ
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(255, 206, 86, 0.7)'
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    }
                }
            }
        });
    }

    // 3. ゲームのメインロジック
    function playGame(playerChoice) {
        // コンピュータの手をランダムに選択
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
        // 勝敗を判定
        let result = '';
        if (playerChoice === computerChoice) {
            result = 'draw';
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'scissors' && computerChoice === 'paper') ||
            (playerChoice === 'paper' && computerChoice === 'rock')
        ) {
            result = 'win';
        } else {
            result = 'loss';
        }

        // 統計を更新
        updateStats(result);

        // 結果を画面に表示
        displayResult(playerChoice, computerChoice, result);
    }

    // 4. 統計データを更新する関数
    function updateStats(result) {
        if (result === 'win') {
            stats.wins++;
        } else if (result === 'loss') {
            stats.losses++;
        } else {
            stats.draws++;
        }
        // グラフを更新
        updateChart();
    }
    
    // 5. グラフの表示を更新する関数
    function updateChart() {
        statsChart.data.datasets[0].data = [stats.wins, stats.losses, stats.draws];
        statsChart.update(); // グラフを再描画
    }

    // 6. 結果をHTMLに表示する関数
    function displayResult(player, computer, result) {
        $('#player-choice').text(choiceText[player]);
        $('#computer-choice').text(choiceText[computer]);

        const resultMessage = $('#result-message');
        if (result === 'win') {
            resultMessage.text('あなたの勝ちです！🎉').css('color', 'green');
        } else if (result === 'loss') {
            resultMessage.text('あなたの負けです...😢').css('color', 'red');
        } else {
            resultMessage.text('引き分けです。').css('color', 'orange');
        }
    }

    // 7. イベントリスナーの設定 (jQueryを使用)
    $('.btn').on('click', function() {
        const playerChoice = $(this).attr('id');
        playGame(playerChoice);
    });

    // 8. 初期化関数の呼び出し
    initializeChart();
});