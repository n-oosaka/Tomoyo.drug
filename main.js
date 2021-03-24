'use strict';

{
  class drank {
    constructor(_className,_classText) {
      this.className = _className
      this.text = _classText

      const section = document.createElement('section');
      section.classList.add('container');
      
      // 表示用テキスト ex.朝のお薬
      this.mes = document.createElement('div');
      this.mes.textContent = this.text;
      this.mes.classList.add('mes');

      // ボタン配置 飲んだ→23:59
      this.btn = document.createElement('div');
      this.btn.textContent = '飲んだ';
      this.btn.classList.add('btn');

      // クリック時の処理
      this.btn.addEventListener('click', () => {
        // すでにクリックされている場合は何もしない
        if (this.btn.classList.contains('drunk') === true) {
          return;
        }
        // btnクラス削除、drunkクラス追加
        this.btn.classList.remove('btn');
        this.btn.classList.add('drunk');
        // クリック時、時刻を表示
        this.btn.textContent = `${getTimeHM()}`;
        // ローカルに保存
        localStorage.setItem(`${this.className}.text`, this.btn.textContent);
        localStorage.setItem('drunkDate.text', `${getDate()}`);
      });

      // 表示用テキストとボタンをsectionに追加
      section.appendChild(this.mes);
      section.appendChild(this.btn);

      const main = document.querySelector('main');
      main.appendChild(section);
      // ローカルストレージを削除または読み込み
      this.removeLocalStorage()
    }

    // ローカルストレージを削除
    removeLocalStorage() {
      // localStorage.removeItem('drankMorning.text');
      // localStorage.removeItem('drankEvening.text');
      
      // F12 Application -> Storage -> Local Storage で中身が確認できる
      // 前回保存日と今日の日付が一致しない かつ 3時以降の場合、削除
      var strValue = localStorage.getItem('drunkDate.text');
      // if (strValue !== `${getDate()}`) {
      if ((strValue !== `${getDate()}`) && (Number(`${getHour()}`) >= 3)) {
        localStorage.removeItem(`${this.className}.text`);
      } else {
        // 同じ日付の場合はデータを読み込む
        this.readLocalStorage();
      }
    }
    readLocalStorage() {
      var strValue = localStorage.getItem(`${this.className}.text`);
      if (strValue !== null) {
        // データを読み込んでからクラスを変更する
        this.btn.textContent = strValue;
        this.btn.classList.remove('btn');
        this.btn.classList.add('drunk');
      }
    }
  }

  // 関数
  function getTimeHM() {
    const d = new Date(Date.now());

    // -6h 時間の基準 6時間引かないとダメな時もある
    var h = d.getHours();
    // h = h - 6;
    if (h < 0) {
      h = h + 24;
    }
    h = String(h).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    
    return h + ":" + m;
  }

  function getHour() {
    const d = new Date(Date.now());
    var hour = d.getHours();
    return hour;
  }

  function getDate() {
    const d = new Date(Date.now());
    var date = d.getDate();
    return date;
  }

  // クラスのインスタンス化
  new drank('drankMorning','朝のお薬');
  // new drank('drankTest','昼のお薬');
  new drank('drankEvening','夜のお薬');
}